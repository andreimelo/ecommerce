const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cart');
const Coupon = require('../models/coupon');
const Order = require('../models/order');

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

exports.saveAddress = async (req, res) => {
	try {
		await User.findOneAndUpdate(
			{
				email : req.user.email,
			},
			{
				address1 : req.user.address1,
				address2 : req.user.address2,
				state    : req.user.state,
				city     : req.user.city,
				zip_code : req.user.zip_code,
			},
		).exec();
		res.json({ ok: true });
	} catch (error) {
		console.log(error);
		res.status(400).send('Save user details failed');
	}
};

exports.applyCouponToCart = async (req, res) => {
	try {
		const { coupon } = req.body;
		const validCoupon = await Coupon.findOne({ name: coupon }).exec();
		if (validCoupon === null) {
			return res.json({
				err : 'Invalid coupon',
			});
		}
		console.log(validCoupon, 'VALID COUPON');

		const user = await User.findOne({ email: req.user.email }).exec();

		let { cartTotal } = await Cart.findOne({
			orderedBy : user._id,
		})
			.populate('products.product', '_id title price')
			.exec();

		console.log(cartTotal, ' cartTotal');

		let totalDiscount = (cartTotal - cartTotal * validCoupon.discount / 100).toFixed(
			2,
		);

		Cart.findOneAndUpdate(
			{ orderedBy: user._id },
			{ totalDiscount },
			{ new: true },
		).exec();

		res.json({
			totalDiscount,
			discount      : validCoupon.discount,
			ok            : true,
		});
	} catch (error) {
		res.status(400).send('Apply coupon failed');
	}
};

exports.createOrder = async (req, res) => {
	try {
		const { paymentIntent } = req.body.stripeResponse;
		const user = await User.findOne({ email: req.user.email }).exec();
		let { products } = await Cart.findOne({ orderedBy: user._id }).exec();

		let newOrder = await new Order({
			products,
			paymentIntent,
			orderedBy     : user._id,
		}).save();
		console.log(newOrder, 'SAVE NEW ORDER');

		res.json({
			ok : true,
		});
	} catch (error) {
		console.log(error);
		res.status(400).send('Create order failed');
	}
};
