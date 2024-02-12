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
