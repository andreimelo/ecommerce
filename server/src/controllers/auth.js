const User = require('../models/user');

exports.defaultAuthRoute = (req, res) => {
	return res.json({ data: 'This is auth route' });
};

exports.createOrUpdateUser = async (req, res) => {
	const { name, picture, email } = req.user;

	const user = await User.findOneAndUpdate({ email }, { name, picture }, { new: true });

	if (user) {
		return res.json(user);
	}
	else {
		const newUser = await new User({
			email,
			name,
			picture,
		}).save();
		return res.json(newUser);
	}
};
