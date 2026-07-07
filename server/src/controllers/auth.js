const User = require('../models/user');
const {	createAccessToken,
	createCsrfToken,
	createRefreshToken,
	clearAuthCookies,
	setAuthCookies,
	verifyToken,
	getCookieValue,
	buildCookieOptions,
} = require('../utilities/auth');

// refactor and fix the error message

exports.defaultAuthRoute = (req, res) => {
	return res.json({ data: 'This is auth route' });
};

function issueSessionCookies(res, user){
	const sessionUser = {
		email : user.email,
		uid   : user._id,
		role  : user.role || 'user',
	};
	const accessToken = createAccessToken(sessionUser);
	const refreshToken = createRefreshToken(sessionUser);
	const csrfToken = createCsrfToken();
	setAuthCookies(res, { accessToken, refreshToken, csrfToken });
	return { accessToken, refreshToken, csrfToken };
}

exports.createOrUpdateUser = async (req, res) => {
	try {
		const { name, picture, email } = req.user;

		const user = await User.findOneAndUpdate(
			{ email },
			{ name, picture },
			{ new: true, upsert: true, setDefaultsOnInsert: true },
		);

		issueSessionCookies(res, user);
		const responseUser = user.toObject ? user.toObject() : user;
		return res.json(responseUser);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Unable to create or update user', error });
	}
};

exports.currentUser = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.user.email }).exec();
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		issueSessionCookies(res, user);
		return res.json(user);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Unable to fetch current user', error });
	}
};

exports.refreshToken = async (req, res) => {
	try {
		const refreshToken = getCookieValue(req, 'refresh_token');
		if (!refreshToken) {
			return res.status(401).json({ message: 'Refresh token missing' });
		}

		const payload = verifyToken(refreshToken);
		if (payload.type !== 'refresh') {
			throw new Error('Invalid refresh token');
		}

		const user = await User.findOne({ email: payload.email }).exec();
		if (!user) {
			clearAuthCookies(res);
			return res.status(401).json({ message: 'Session expired' });
		}

		issueSessionCookies(res, user);
		return res.json({ ok: true });
	} catch (error) {
		clearAuthCookies(res);
		return res.status(401).json({ message: 'Unable to refresh session', error: error.message });
	}
};

exports.logout = (req, res) => {
	clearAuthCookies(res);
	return res.json({ ok: true });
};

exports.csrfToken = (req, res) => {
	const csrfToken = createCsrfToken();
	const secure = process.env.NODE_ENV === 'production';
	res.cookie('csrf_token', csrfToken, buildCookieOptions({ secure, httpOnly: false, maxAge: 60 * 60 * 1000 }));
	return res.json({ csrfToken });
};
