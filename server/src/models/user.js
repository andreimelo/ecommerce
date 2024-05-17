const mongoose = require('mongoose');
// const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
	{
		name     : String,
		email    : {
			type     : String,
			required : true,
			index    : true,
		},
		role     : {
			type    : String,
			default : 'subscriber',
		},
		cart     : {
			type    : Array,
			default : [],
		},
		address1 : String,
		address2 : String,
		state    : String,
		city     : String,
		zip_code : String,
		wishlist : [
			{ type: ObjectId, ref: 'Product' },
		],
	},
	{ timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
