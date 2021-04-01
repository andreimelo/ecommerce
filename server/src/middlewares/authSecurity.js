const admin = require('../config/firebase');

exports.authCheck = async (req, res, next) => {
	let { authToken } = req.headers;
	try {
		const firebaseUser = await admin.auth().verifyIdToken(authToken);
		console.log(firebaseUser);
		req.user = firebaseUser;
		next();
	} catch (error) {
		res.status(401).json({
			error,
		});
	}
};
