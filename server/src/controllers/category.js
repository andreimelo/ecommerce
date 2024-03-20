const Category = require('../models/category');
const Product = require('../models/product');
const SubCategory = require('../models/sub-category');
const slugify = require('slugify');

// refactor and fix the error message
exports.create = async (req, res) => {
	try {
		const { name } = req.body;
		let createCategory = await new Category({ name, slug: slugify(name) }).save();
		res.json(createCategory);
	} catch (err) {
		// refactor
		res.status(400).send('Create category failed');
	}
};

exports.list = async (req, res) => {
	try {
		let listCategory = await Category.find({}).sort({ createdAt: -1 }).exec();
		res.json(listCategory);
	} catch (error) {
		// console.log(err);
		res.status(400).send('Fetch list category failed');
	}
};

exports.read = async (req, res) => {
	try {
		let category = await Category.findOne({ slug: req.params.slug }).exec();
		const products = await Product.find({ category }).populate('category').exec();
		res.json({
			category,
			products,
		});
	} catch (err) {
		// console.log(err);
		res.status(400).send('Read category failed');
	}
};

exports.update = async (req, res) => {
	try {
		const { name } = req.body;
		const updateCategory = await Category.findOneAndUpdate(
			{ slug: req.params.slug },
			{ name, slug: slugify(name) },
			{ new: true },
		);
		res.json(updateCategory);
	} catch (err) {
		// console.log(err);
		res.status(400).send('Update category failed');
	}
};

exports.remove = async (req, res) => {
	try {
		let deleteCategory = await Category.findOneAndDelete({ slug: req.params.slug });
		res.json(deleteCategory);
	} catch (err) {
		// console.log(err);
		res.status(400).send('Delete category failed');
	}
};

exports.getSubCategory = async (req, res) => {
	try {
		const getSub = await SubCategory.find({ parent: req.params.id }).exec();
		res.json(getSub);
	} catch (error) {
		res.status(400).send('Fetch sub category failed');
	}
};
