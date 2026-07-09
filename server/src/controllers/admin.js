const Order = require('../models/order');
const User = require('../models/user');

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

exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, email, role } = req.body;

        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            {
                name,
                email,
                role,
            },
            {
                new: true,
				runValidators: true,
            }
        );
		
        if (!updatedUser) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        console.log('Updated User:', updatedUser);

        return res.json({
            message: 'User updated successfully',
            user: updatedUser,
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message,
        });
    }
};

