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

exports.read = async (req, res) => {
	try {
		let getAllProducts = await Product.find({});
		res.json(getAllProducts);
	} catch (err) {
		res.status(400).send('Read products failed');
	}
};
