const Product = require('../models/product');
const User = require('../models/user');
const slugify = require('slugify');

// refactor and fix the error message
exports.create = async (req, res) => {
	try {
		req.body.slug = slugify(req.body.title);
		let newProduct = await new Product(req.body).save();
		res.json(newProduct);
	} catch (err) {
		res.status(400).send('Create product failed');
	}
};

exports.list = async (req, res) => {
	try {
		let getAllProducts = await Product.find({})
			.limit(parseInt(req.params.count))
			.populate('category')
			.populate('subCategory')
			.sort([
				[
					'createdAt',
					'desc',
				],
			])
			.exec();
		res.json(getAllProducts);
	} catch (err) {
		res.status(400).send('Fetch all products failed');
	}
};

exports.remove = async (req, res) => {
	try {
		const deleted = await Product.findOneAndRemove({ slug: req.params.slug }).exec();
		res.json(deleted);
	} catch (err) {
		res.status(400).send('Product delete failed');
	}
};

exports.read = async (req, res) => {
	try {
		const getProduct = await Product.findOne({ slug: req.params.slug })
			.populate('category')
			.populate('subCategory')
			.populate('ratings.postedBy', 'name email')
			.exec();
		res.json(getProduct);
	} catch (error) {
		res.status(400).send('Fetch product failed');
	}
};

exports.update = async (req, res) => {
	try {
		if (req.body.title) {
			req.body.slug = slugify(req.body.title);
		}
		const update = await Product.findOneAndUpdate(
			{ slug: req.params.slug },
			req.body,
			{ new: true },
		).exec();
		res.json(update);
	} catch (error) {
		res.status(400).send('Update product failed');
	}
};
// Without pagination
// exports.listAll = async (req, res) => {
// 	try {
// 		const { sort, order, limit } = req.body;
// 		const products = await Product.find({})
// 			.populate('category')
// 			.populate('subCategory')
// 			.sort([
// 				[
// 					sort,
// 					order,
// 				],
// 			])
// 			.limit(limit)
// 			.exec();
// 		res.json(products);
// 	} catch (error) {
// 		res.status(400).send('Fetch products failed');
// 	}
// };

// With pagination
exports.listAll = async (req, res) => {
	try {
		let { sort, order, page } = req.body;
		const currentPage = page || 1;
		const perPage = 3;
		let noSold;

		if (sort === 'sold') {
			noSold = { sold: { $gt: 0 } };
		}

		const products = await Product.find({ ...noSold })
			.skip((currentPage - 1) * perPage)
			.populate('category')
			.populate('subCategory')
			.sort([
				[
					sort,
					order,
				],
			])
			.limit(perPage)
			.exec();
		res.json(products);
	} catch (error) {
		res.status(400).send('Fetch list of products failed');
	}
};

exports.productRatingStar = async (req, res) => {
	try {
		const product = await Product.findById(req.params.productId).exec();
		const user = await User.findOne({ email: req.user.email }).exec();
		const { star, comment = '', images = [] } = req.body;

		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		if (!star || Number(star) < 1 || Number(star) > 5) {
			return res.status(400).json({ message: 'Star rating must be between 1 and 5' });
		}

		const userId = user._id.toString();
		const userRatings = product.ratings.filter(
			(item) => item.postedBy && item.postedBy.toString() === userId,
		);

		if (!userRatings.length) {
			const ratingAdded = await Product.findByIdAndUpdate(
				product._id,
				{
					$push : { ratings: { star, comment, images, postedBy: user._id, createdAt: new Date() } },
				},
				{ new: true },
			).exec();
			return res.json(ratingAdded);
		}

		// Keep original submission date while deduping any accidental duplicate entries.
		const originalCreatedAt = userRatings
			.map((item) => item.createdAt)
			.filter(Boolean)
			.sort((first, second) => new Date(first) - new Date(second))[0] || new Date();

		await Product.findByIdAndUpdate(
			product._id,
			{
				$pull : {
					ratings : { postedBy: user._id },
				},
			},
		).exec();

		const ratingUpdated = await Product.findByIdAndUpdate(
			product._id,
			{
				$push : {
					ratings : {
						star,
						comment,
						images,
						postedBy  : user._id,
						createdAt : originalCreatedAt,
					},
				},
			},
			{ new: true },
		).exec();

		return res.json(ratingUpdated);
	} catch (error) {
		res.status(400).send('Fetch products count failed');
	}
};

exports.removeProductReview = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.user.email }).exec();

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const updatedProduct = await Product.findByIdAndUpdate(
			req.params.productId,
			{
				$pull : {
					ratings : {
						postedBy : user._id,
					},
				},
			},
			{ new: true },
		).exec();

		if (!updatedProduct) {
			return res.status(404).json({ message: 'Product not found' });
		}

		return res.json({
			ok      : true,
			product : updatedProduct,
		});
	} catch (error) {
		return res.status(400).json({ message: 'Delete review failed', error: error.message || error });
	}
};

exports.listRelated = async (req, res) => {
	try {
		const product = await Product.findById(req.params.productId).exec();
		const related = await Product.find({
			_id      : {
				$ne : product._id,
			},
			category : product.category,
		})
			.limit(3)
			.populate('category')
			.populate('subCategory')
			.populate('postedBy')
			.exec();
		return res.json(related);
	} catch (error) {
		res.status(400).send('Fetch related product failed');
	}
};

const handleQuery = async (req, res) => {
	const { query, price, category, subCategory, shipping, color, brand } = req.body;

	let productQuery = {};

	if (query || query !== '') {
		productQuery.$text = { $search: query };
	}

	if (price) {
		productQuery.price = { $gte: price[0], $lte: price[1] };
	}

	if (category && category.length > 0) {
		productQuery.category = category;
	}

	if (subCategory && subCategory.length > 0) {
		productQuery.subCategory = subCategory;
	}

	if (shipping && shipping.length > 0) {
		productQuery.shipping = shipping;
	}

	if (color && color.length > 0) {
		productQuery.color = color;
	}

	if (brand && brand.length > 0) {
		productQuery.brand = brand;
	}

	// if (stars) {
	// 	console.log(stars, 'AGGREGATE STARS');
	// 	let aggregateStars = await Product.aggregate([
	// 		{
	// 			$project : {
	// 				document     : '$$ROOT',
	// 				floorAverage : {
	// 					$floor : { $avg: '$rating.star' },
	// 				},
	// 			},
	// 		},
	// 		{ $match: { floorAverage: stars } },
	// 	])
	// 		.limit(12)
	// 		.exec();
	// 	console.log(aggregateStars, 'AGGREGATE STARS');
	// 	productQuery.stars = aggregateStars;
	// }

	const products = await Product.find({
		$and : [
			productQuery, // Match the query (case-insensitive)
		],
	})
		.populate('category', '_id name')
		.populate('subCategory', '_id name')
		.populate('postedBy', '_id name')
		.exec();
	res.json(products);
};

exports.searchFilters = async (req, res) => {
	try {
		if (req.body) {
			await handleQuery(req, res);
		}
	} catch (error) {
		res.status(400).send('Search filter failed');
	}
};
