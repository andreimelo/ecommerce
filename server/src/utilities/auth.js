const crypto = require('crypto');
const jwt = require('jsonwebtoken');

function getJwtSecret(){
	if (!process.env.JWT_SECRET) {
		throw new Error('JWT_SECRET is required');
	}

	return process.env.JWT_SECRET;
}

function getCookieValue(req, name){
	const cookieHeader = req.headers.cookie || '';
	const cookies = cookieHeader.split(';').map((cookie) => cookie.trim());
	const match = cookies.find((cookie) => cookie.startsWith(`${name}=`));

	if (!match) {
		return undefined;
	}

	return decodeURIComponent(match.split('=').slice(1).join('='));
}

function buildCookieOptions({ secure = false, maxAge = 15 * 60 * 1000, httpOnly = true } = {}){
	return {
		httpOnly,
		secure,
		sameSite : 'lax',
		path     : '/',
		maxAge,
	};
}

function createSessionPayload(user = {}){
	return {
		email : user.email,
		uid   : user.uid || user._id || user.email,
		role  : user.role || 'user',
	};
}

function createAccessToken(user = {}){
	return jwt.sign(
		{ ...createSessionPayload(user), type: 'access' },
		getJwtSecret(),
		{ expiresIn: '15m' },
	);
}

function createRefreshToken(user = {}){
	return jwt.sign(
		{ ...createSessionPayload(user), type: 'refresh', jti: user.refreshTokenId },
		getJwtSecret(),
		{ expiresIn: '7d' },
	);
}

function verifyToken(token){
	return jwt.verify(token, getJwtSecret());
}

function createRefreshTokenId(){
	return crypto.randomBytes(32).toString('hex');
}

function createCsrfToken(user = {}){
	return jwt.sign(
		{
			type  : 'csrf',
			email : user.email,
			uid   : user.uid,
			nonce : crypto.randomBytes(12).toString('hex'),
		},
		getJwtSecret(),
		{ expiresIn: '1h' },
	);
}

function setAuthCookies(res, { accessToken, refreshToken, csrfToken }){
	const secure = process.env.NODE_ENV === 'production';
	res.cookie('access_token', accessToken, buildCookieOptions({ secure, maxAge: 15 * 60 * 1000 }));
	res.cookie('refresh_token', refreshToken, buildCookieOptions({ secure, maxAge: 7 * 24 * 60 * 60 * 1000 }));
	res.cookie('csrf_token', csrfToken, buildCookieOptions({ secure, httpOnly: false, maxAge: 60 * 60 * 1000 }));
}

function clearAuthCookies(res){
	const secure = process.env.NODE_ENV === 'production';
	res.clearCookie('access_token', buildCookieOptions({ secure }));
	res.clearCookie('refresh_token', buildCookieOptions({ secure }));
	res.clearCookie('csrf_token', buildCookieOptions({ secure, httpOnly: false }));
}

module.exports = {
	getCookieValue,
	buildCookieOptions,
	createSessionPayload,
	createAccessToken,
	createRefreshToken,
	createRefreshTokenId,
	verifyToken,
	createCsrfToken,
	setAuthCookies,
	clearAuthCookies,
};
