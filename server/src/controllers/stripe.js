// const User = require('../models/user');
// const Cart = require('../models/cart');
// const Product = require('../models/product');
// const Coupon = require('../models/coupon');
const { stripe } = require('../config/stripe');

exports.createPaymentIntent = async (req, res) => {
	try {
		const paymentIntent = await stripe.paymentIntents.create({
			// sample amount - refactor
			amount   : 100,
			currency : 'usd',
		});

		res.send({
			clientSecret : paymentIntent.client_secret,
		});
	} catch (error) {
		console.log(error);
		res.status(400).send('Payment Intent failed');
	}
};
