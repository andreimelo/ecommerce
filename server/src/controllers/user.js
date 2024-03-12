const User = require('../models/user');

exports.list = async (req, res) => {
	try {
		let listOfAccounts = await User.find({}).sort({ createdAt: -1 }).exec();
		res.json(listOfAccounts);
	} catch (error) {
		// console.log(err);
		res.status(400).send('Fetch list user accounts failed');
	}
};
