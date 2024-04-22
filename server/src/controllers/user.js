const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.list = async (req, res) => {
	try {
		let listOfAccounts = await User.find({}).sort({ createdAt: -1 }).exec();
		res.json(listOfAccounts);
	} catch (error) {
		// console.log(err);
		res.status(400).send('Fetch list user accounts failed');
	}
};

exports.userCart = async (req, res) => {
	try {
		const { cart } = req.body;
		const user = await User.findOne({ email: req.user.email }).exec();

		let cartExistByThisUser = await Cart.findOne({ orderedBy: user._id }).exec();

		if (cartExistByThisUser) {
			cartExistByThisUser.remove();
		}
		let products = [];

		for (let i = 0; i < cart.length; i++) {
			let object = {};
			object.product = cart[i]._id;
			object.count = cart[i].count;
			object.color = cart[i].color;
			let { price } = await Product.findById(cart[i]._id).select('price').exec();
			object.price = price;
			products.push(object);
		}
		let cartTotal = 0;

		for (let i = 0; i < products.length; i++) {
			cartTotal = cartTotal + products[i].price * products[i].count;
		}

		let newCart = await Cart({
			products,
			cartTotal,
			orderedBy : user._id,
		}).save();
		console.log(newCart, 'save');

		res.json({ ok: true });
	} catch (error) {
		// console.log(err);
		console.log(error);
		res.status(400).send('Saving user cart failed');
	}
};

exports.getUserCart = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.user.email }).exec();
		let cart = await Cart.findOne({ orderedBy: user._id })
			.populate('products.product', '_id title price totalDiscount')
			.exec();
		const { products, cartTotal, totalDiscount } = cart;
		res.json({
			products,
			cartTotal,
			totalDiscount,
		});
	} catch (error) {
		console.log(error);
		res.status(400).send('Get user cart failed');
	}
};
