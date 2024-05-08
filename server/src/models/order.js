const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
	{
		products      : [
			{
				product : {
					type : ObjectId,
					ref  : 'Product',
				},
				count   : Number,
				color   : String,
			},
		],
		paymentIntent : {},
		orderStatus   : {
			type    : String,
			default : 'Not yet processed',
			enum    : [
				'Not yet processed',
				'Ongoing process',
				'Order has been dispatched',
				'Out for delivery',
				'Order has been cancelled',
				'Order is completed',
			],
		},
		orderedBy     : { type: ObjectId, ref: 'User' },
	},
	{ timestamps: true },
);

module.exports = mongoose.model('Order', orderSchema);
