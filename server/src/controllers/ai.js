const Product = require('../models/product');
const Category = require('../models/category');
const User = require('../models/user');
const Order = require('../models/order');
const { getCookieValue, verifyToken } = require('../utilities/auth');

function parseBudget(message = '') {
	const underMatch = message.match(/under\s*\$?\s*(\d+(?:\.\d+)?)/i);
	const belowMatch = message.match(/below\s*\$?\s*(\d+(?:\.\d+)?)/i);
	const lessMatch = message.match(/less than\s*\$?\s*(\d+(?:\.\d+)?)/i);
	const match = underMatch || belowMatch || lessMatch;
	return match ? Number(match[1]) : null;
}

function normalizeKeywords(message = '') {
	return message
		.toLowerCase()
		.replace(/[^a-z0-9\s]/g, ' ')
		.split(/\s+/)
		.filter((word) => word && word.length > 2);
}

function summarizeReviews(ratings = []) {
	if (!ratings.length) {
		return 'No customer reviews yet.';
	}

	const avg = ratings.reduce((sum, item) => sum + Number(item.star || 0), 0) / ratings.length;
	const withComments = ratings.filter((item) => item.comment && item.comment.trim());

	if (!withComments.length) {
		return `Rated ${avg.toFixed(1)}/5 from ${ratings.length} verified rating${ratings.length > 1 ? 's' : ''}.`;
	}

	const words = withComments
		.map((item) => item.comment.toLowerCase())
		.join(' ')
		.replace(/[^a-z0-9\s]/g, ' ')
		.split(/\s+/)
		.filter((word) => word.length > 3);
	const frequency = words.reduce((acc, word) => {
		acc[word] = (acc[word] || 0) + 1;
		return acc;
	}, {});
	const topWords = Object.entries(frequency)
		.sort((a, b) => b[1] - a[1])
		.slice(0, 3)
		.map(([word]) => word);

	const themeText = topWords.length ? `Common feedback: ${topWords.join(', ')}.` : '';
	return `Rated ${avg.toFixed(1)}/5 from ${ratings.length} verified review${ratings.length > 1 ? 's' : ''}. ${themeText}`.trim();
}

function buildGeneratedDescription(product) {
	const parts = [
		product.title,
		product.brand ? `by ${product.brand}` : '',
		product.color ? `in ${product.color}` : '',
		product.shipping ? `${product.shipping} shipping` : '',
	]
		.filter(Boolean)
		.join(' ');

	const shortDescription = product.description
		? product.description.slice(0, 140).trim()
		: 'Great choice for everyday use.';

	return `${parts}. ${shortDescription}`;
}

exports.shoppingAssistant = async (req, res) => {
	try {
		const message = String(req.body.message || '').trim();
		if (!message) {
			return res.status(400).json({ message: 'Prompt is required' });
		}

		const budget = parseBudget(message);
		const keywords = normalizeKeywords(message);

		const categoryDocs = await Category.find({}).select('_id name').exec();
		const matchedCategories = categoryDocs.filter((category) => {
			const categoryName = String(category.name || '').toLowerCase();
			return keywords.some((word) => categoryName.includes(word));
		});

		const query = {};
		if (budget !== null) {
			query.price = { $lte: budget };
		}
		if (matchedCategories.length) {
			query.category = { $in: matchedCategories.map((item) => item._id) };
		}

		const products = await Product.find(query)
			.populate('category', 'name')
			.populate('subCategory', 'name slug')
			.limit(24)
			.sort({ sold: -1, createdAt: -1 })
			.exec();

		let preferenceKeywords = [];
		const accessToken = getCookieValue(req, 'access_token');

		if (accessToken) {
			try {
				const payload = verifyToken(accessToken);
				const user = await User.findOne({ email: payload.email })
					.select('wishlist')
					.populate('wishlist', 'title brand category')
					.exec();

				if (user) {
					const recentOrders = await Order.find({ orderedBy: user._id })
						.sort({ createdAt: -1 })
						.limit(5)
						.populate('products.product', 'title brand category')
						.exec();

					const wishlistTerms = (user.wishlist || []).flatMap((item) => [item.title, item.brand]);
					const orderTerms = recentOrders.flatMap((order) => (
						(order.products || []).flatMap((item) => [item.product?.title, item.product?.brand])
					));

					preferenceKeywords = [...wishlistTerms, ...orderTerms]
						.filter(Boolean)
						.map((term) => String(term).toLowerCase());
				}
			} catch (error) {
				// Ignore invalid access cookie for unauthenticated assistant usage.
			}
		}

		const filteredProducts = keywords.length
			? products.filter((product) => {
				const haystack = [
					product.title,
					product.brand,
					product.color,
					product.description,
					...(product.subCategory || []).map((item) => item.name),
				]
					.filter(Boolean)
					.join(' ')
					.toLowerCase();

				return keywords.some((word) => haystack.includes(word));
			})
			: products;

		const recommendationBase = filteredProducts.length ? filteredProducts : products;

		const personalizedProducts = preferenceKeywords.length
			? [...recommendationBase].sort((first, second) => {
				const firstText = `${first.title || ''} ${first.brand || ''} ${first.category?.name || ''}`.toLowerCase();
				const secondText = `${second.title || ''} ${second.brand || ''} ${second.category?.name || ''}`.toLowerCase();
				const firstScore = preferenceKeywords.reduce((score, keyword) => (firstText.includes(keyword) ? score + 1 : score), 0);
				const secondScore = preferenceKeywords.reduce((score, keyword) => (secondText.includes(keyword) ? score + 1 : score), 0);
				return secondScore - firstScore;
			})
			: recommendationBase;

		const recommendations = personalizedProducts.slice(0, 6).map((product) => ({
			id                    : product._id,
			slug                  : product.slug,
			title                 : product.title,
			price                 : product.price,
			brand                 : product.brand,
			category              : product.category?.name || '',
			subCategory           : (product.subCategory || []).map((item) => item.name),
			aiGeneratedDescription: buildGeneratedDescription(product),
			reviewSummary         : summarizeReviews(product.ratings || []),
			images                : product.images || [],
		}));

		const usedFallback = keywords.length > 0 && filteredProducts.length === 0;

		const assistantMessage = recommendations.length
			? usedFallback
				? `I could not find exact keyword matches, but here are ${recommendations.length} close options${budget !== null ? ` under $${budget}` : ''}.`
				: `I found ${recommendations.length} product${recommendations.length > 1 ? 's' : ''} that match your request${budget !== null ? ` under $${budget}` : ''}.`
			: 'I could not find exact matches. Try a broader phrase or a higher budget.';

		return res.json({
			ok             : true,
			assistantMessage,
			budget,
			keywords,
			recommendations,
		});
	} catch (error) {
		return res.status(500).json({ message: 'AI assistant request failed', error: error.message || error });
	}
};
