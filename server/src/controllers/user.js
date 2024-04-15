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
		let product = [];
		const user = await User.findOne({ email: req.user.email }).exec();

		let cartExistByThisUser = await Cart.findOne({ orderedBy: user._id }).exec();

		if (cartExistByThisUser) {
			cartExistByThisUser.remove();
		}

		for (let i = 0; i < cart.length; i++) {
			let object = {};

			object.product = cart[i]._id;
			object.product = cart[i].count;
			object.product = cart[i].color;
			let { price } = await Product.findById(cart[i]._id).select('price').exec();
			object.price = price;
			product.push(object);
		}

		let cartTotal;

		for (let i = 0; i < product.length; i++) {
			cartTotal = products[i].price * products[i].count;
		}

		let newCart = await Cart({
			product,
			cartTotal,
			orderedBy : user._id,
		}).save();

		console.log(newCart);
		res.json({ ok: true });
	} catch (error) {
		// console.log(err);
		res.status(400).send('Fetch list user accounts failed');
	}
};
