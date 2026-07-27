const User = require('../models/user');
const {	createAccessToken,
	createCsrfToken,
	createRefreshToken,
	createRefreshTokenId,
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

async function issueSessionCookies(res, user){
	const sessionUser = {
		email : user.email,
		uid   : user._id,
		role  : user.role || 'user',
	};
	const refreshTokenId = createRefreshTokenId();
	const accessToken = createAccessToken(sessionUser);
	const refreshToken = createRefreshToken({
		...sessionUser,
		refreshTokenId,
	});
	const csrfToken = createCsrfToken(sessionUser);

	await User.findByIdAndUpdate(
		user._id,
		{ currentRefreshTokenId: refreshTokenId },
		{ new: true },
	).exec();

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

		await issueSessionCookies(res, user);
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
		await issueSessionCookies(res, user);
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
		if (payload.type !== 'refresh' || !payload.jti) {
			throw new Error('Invalid refresh token');
		}

		const user = await User.findOne({ email: payload.email }).exec();
		if (!user) {
			clearAuthCookies(res);
			return res.status(401).json({ message: 'Session expired' });
		}

		if (!user.currentRefreshTokenId || user.currentRefreshTokenId !== payload.jti) {
			clearAuthCookies(res);
			return res.status(401).json({ message: 'Refresh token revoked' });
		}

		await issueSessionCookies(res, user);
		return res.json({ ok: true });
	} catch (error) {
		clearAuthCookies(res);
		return res.status(401).json({ message: 'Unable to refresh session', error: error.message });
	}
};

exports.logout = async (req, res) => {
	try {
		const refreshToken = getCookieValue(req, 'refresh_token');
		if (refreshToken) {
			const payload = verifyToken(refreshToken);
			if (payload?.email) {
				await User.findOneAndUpdate(
					{ email: payload.email },
					{ currentRefreshTokenId: null },
				).exec();
			}
		}
	} catch (error) {
		// Ignore token parsing failures during logout cleanup.
	}

	clearAuthCookies(res);
	return res.json({ ok: true });
};

exports.csrfToken = (req, res) => {
	let sessionClaims = {};
	const accessToken = getCookieValue(req, 'access_token');

	if (accessToken) {
		try {
			const payload = verifyToken(accessToken);
			sessionClaims = {
				email : payload.email,
				uid   : payload.uid,
			};
		} catch (error) {
			// Ignore invalid session cookies and issue a non-session-bound CSRF token.
		}
	}

	const csrfToken = createCsrfToken(sessionClaims);
	const secure = process.env.NODE_ENV === 'production';
	res.cookie('csrf_token', csrfToken, buildCookieOptions({ secure, httpOnly: false, maxAge: 60 * 60 * 1000 }));
	return res.json({ csrfToken });
};
