const admin = require('../config/firebase');
const User = require('../models/user');

exports.authCheck = async (req, res, next) => {
	let { authtoken } = req.headers;
	try {
		const firebaseUser = await admin.auth().verifyIdToken(authtoken);
		console.log(firebaseUser);
		req.user = firebaseUser;
		next();
	} catch (error) {
		res.status(401).json({
			error,
		});
	}
};

exports.adminCheck = async (req, res, next) => {
	try {
		let { email } = req.user;
		const { role } = await User.findOne({ email }).exec();
		if (role !== 'admin') {
			re.status(403).json({
				message : 'Admin resource, access denied',
			});
		}
		return next();
	} catch (error) {
		res.status(401).json({
			error,
		});
	}
};
