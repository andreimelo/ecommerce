const { getCookieValue } = require('../utilities/auth');

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

	return next();
};
