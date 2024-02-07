const SubCategory = require('../models/sub-category');
const slugify = require('slugify');

// refactor and fix the error message
exports.create = async (req, res) => {
	try {
		const { name, parent } = req.body;
		let createSubCategory = await new SubCategory({
			name,
			parent,
			slug   : slugify(name),
		}).save();
		res.json(createSubCategory);
	} catch (err) {
		// refactor
		res.status(400).send('Create sub category failed');
	}
};

exports.list = async (req, res) => {
	try {
		let listSubCategory = await SubCategory.find({}).sort({ createdAt: -1 }).exec();
		res.json(listSubCategory);
	} catch (error) {
		// console.log(err);
		res.status(400).send('Fetch list sub category failed');
	}
};

exports.read = async (req, res) => {
	try {
		let readSubCategory = await SubCategory.findOne({ slug: req.params.slug }).exec();
		res.json(readSubCategory);
	} catch (err) {
		// console.log(err);
		res.status(400).send('Read sub category failed');
	}
};

exports.update = async (req, res) => {
	try {
		const { name, parent } = req.body;
		const updateSubCategory = await SubCategory.findOneAndUpdate(
			{ slug: req.params.slug },
			{ name, parent, slug: slugify(name) },
			{ new: true },
		);
		res.json(updateSubCategory);
	} catch (err) {
		// console.log(err);
		res.status(400).send('Update sub category failed');
	}
};

exports.remove = async (req, res) => {
	try {
		let deleteSubCategory = await SubCategory.findOneAndDelete({
			slug : req.params.slug,
		});
		res.json(deleteSubCategory);
	} catch (err) {
		// console.log(err);
		res.status(400).send('Delete sub category failed');
	}
};
