const Order = require('../models/order');

exports.orders = async (req, res) => {
	let allOrders = await Order.find({})
		.sort('-createdAt')
		.populate('products.product')
		.populate('orderedBy', 'name email address1 address2 city state zip_code')
		.exec();

	res.json({
		ok        : true,
		allOrders,
	});
};

exports.orderStatus = async (req, res) => {
	const { orderId, orderStatus } = req.body;
	let updatedOrderStatus = await Order.findByIdAndUpdate(
		orderId,
		{ orderStatus },
		{ new: true },
	).exec();

	res.json({
		ok                 : true,
		updatedOrderStatus,
	});
};
