const admin = require('../config/firebase');
const User = require('../models/user');
const { getCookieValue, verifyToken } = require('../utilities/auth');

exports.authCheck = async (req, res, next) => {
	const accessToken = getCookieValue(req, 'access_token');
	const authtoken = req.headers.authtoken || req.headers.authToken;
	try {
		if (accessToken) {

			try {
				const sessionUser = verifyToken(accessToken);
				if (sessionUser.type === 'access') {
					req.user = sessionUser;
					return next();
				}
			} catch (error) {
				// Fall back to the legacy auth token header when the cookie is invalid.
			}
		}

		// if (authtoken) {
		// 	const firebaseUser = await admin.auth().verifyIdToken(authtoken);
		// 	req.user = firebaseUser;
		// 	return next();
		// }

		return res.status(401).json({ message: 'Authentication required' });
	} catch (error) {
		return res.status(401).json({ error: error.message || error });
	}
};

exports.adminCheck = async (req, res, next) => {
	try {
		const { email } = req.user;
		const { role } = await User.findOne({ email }).exec();
		if (role !== 'admin') {
			return res.status(403).json({
				message : 'Admin resource, access denied',
			});
		}
		return next();
	} catch (error) {
		return res.status(401).json({ error: error.message || error });
	}
};
