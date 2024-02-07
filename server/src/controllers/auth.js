const User = require('../models/user');

// refactor and fix the error message

exports.defaultAuthRoute = (req, res) => {
	return res.json({ data: 'This is auth route' });
};

exports.createOrUpdateUser = async (req, res) => {
	try {
		const { name, picture, email } = req.user;

		const user = await User.findOneAndUpdate(
			{ email },
			{ name, picture },
			{ new: true },
		);

		if (user) {
			console.log(user, 'existing user');
			return res.json(user);
		}
		else {
			const newUser = await new User({
				email,
				name,
				picture,
			}).save();
			console.log(newUser, 'new user');
			return res.json(newUser);
		}
	} catch (error) {
		return error;
	}
};

exports.currentUser = async (req, res) => {
	User.findOne({ email: req.user.email }).exec((err, user) => {
		if (err) {
			throw new Error(err);
		}
		res.json(user);
	});
};
