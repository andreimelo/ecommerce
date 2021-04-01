const User = require('../models/user');

exports.defaultAuthRoute = (req, res) => {
	return res.json({ data: 'This is auth route' });
};

exports.createOrUpdateUser = async (req, res) => {
	const { name, picture, email } = req.user;

	const user = await User.findOneAndUpdate({ email }, { name, picture }, { new: true });

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
};
