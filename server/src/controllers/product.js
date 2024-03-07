const Product = require('../models/product');
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
		const { sort, order, page } = req.body;
		const currentPage = page || 1;
		const perPage = 3;
		const products = await Product.find({})
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

// exports.productsCount = async (req, res) => {
// 	try {
// 		let total = await Product.find({}).estimatedDocumentCount().exec();
// 		res.json(total);
// 	} catch (error) {
// 		res.status(400).send('Fetch products count failed');
// 	}
// };
