const { router } = require('../../config/express');
const {
	defaultAuthRoute,
	createOrUpdateUser,
	currentUser,
	refreshToken,
	logout,
	csrfToken,
} = require('../../controllers/auth');
const { authCheck, adminCheck } = require('../../middlewares/authSecurity');
const csrfProtection = require('../../middlewares/csrf');

router.get('/auth', defaultAuthRoute);
router.get('/auth/csrf-token', csrfToken);

// These routes rely on Firebase bearer token auth and run before session cookies are stable
// in cross-site deployments (Netlify -> Render), so CSRF is not required here.
router.post('/auth/create-or-update', authCheck, createOrUpdateUser);
router.post('/auth/current-user', authCheck, currentUser);
router.post('/auth/current-admin', authCheck, adminCheck, currentUser);
router.post('/auth/refresh', csrfProtection, refreshToken);
router.post('/auth/logout', csrfProtection, logout);

module.exports = router;
