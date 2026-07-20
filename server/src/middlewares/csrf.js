const { getCookieValue, verifyToken } = require('../utilities/auth');

module.exports = function csrfProtection(req, res, next){
	if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
		return next();
	}

	const csrfHeader = req.headers['x-csrf-token'] || req.headers['x-xsrf-token'];
	const csrfCookie = getCookieValue(req, 'csrf_token');

	if (!csrfHeader || !csrfCookie || csrfHeader !== csrfCookie) {
		return res.status(403).json({
			message : 'CSRF token missing or invalid',
		});
	}

	try {
		const csrfPayload = verifyToken(csrfHeader);
		if (csrfPayload.type !== 'csrf') {
			return res.status(403).json({ message: 'CSRF token invalid' });
		}

		const accessToken = getCookieValue(req, 'access_token');
		if (accessToken) {
			const accessPayload = verifyToken(accessToken);
			if (
				csrfPayload.uid &&
				accessPayload.uid &&
				String(csrfPayload.uid) !== String(accessPayload.uid)
			) {
				return res.status(403).json({ message: 'CSRF token does not match active session' });
			}

			if (
				csrfPayload.email &&
				accessPayload.email &&
				csrfPayload.email !== accessPayload.email
			) {
				return res.status(403).json({ message: 'CSRF token does not match active session' });
			}
		}
	} catch (error) {
		return res.status(403).json({ message: 'CSRF token verification failed' });
	}

	return next();
};
