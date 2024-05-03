const User = require('../models/user');
const Cart = require('../models/cart');
// const Product = require('../models/product');
// const Coupon = require('../models/coupon');
const { stripe } = require('../config/stripe');

exports.createPaymentIntent = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.user.email }).exec();
		const { cartTotal, totalDiscount } = await Cart.findOne({
			orderedBy : user._id,
		}).exec();
		// console.log(cartTotal, 'Cart Total Charged');
		// console.log(totalDiscount, 'DISCOUNT');
		let finalTotal = 0;
		if (cartTotal && totalDiscount) {
			finalTotal = totalDiscount * 100;
		}
		else {
			finalTotal = cartTotal * 100;
		}

		const paymentIntent = await stripe.paymentIntents.create({
			// sample amount - refactor
			amount   : finalTotal,
			currency : 'usd',
		});

		res.send({
			clientSecret  : paymentIntent.client_secret,
			cartTotal,
			totalDiscount,
			payable       : finalTotal,
		});
	} catch (error) {
		// console.log(error);
		res.status(400).send('Payment Intent failed');
	}
};
