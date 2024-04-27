const Coupon = require('../models/coupon');

exports.create = async (req, res) => {
	try {
		const { name, expiry, discount } = req.body;
		const createCoupon = await Coupon({ name, expiry, discount }).save();
		res.json({
			data : createCoupon,
			ok   : true,
		});
	} catch (error) {
		res.status(400).json(error);
	}
};

exports.remove = async (req, res) => {
	try {
		const removeCoupon = await Coupon.findByIdAndDelete(req.params.couponId).exec();
		res.json({
			data : removeCoupon,
			ok   : true,
		});
	} catch (error) {
		res.status(400).json(error);
	}
};

exports.list = async (req, res) => {
	try {
		const listCoupon = await Coupon.find({}).sort({ createdAt: -1 }).exec();
		res.json({
			data : listCoupon,
			ok   : true,
		});
	} catch (error) {
		res.status(400).json(error);
	}
};
