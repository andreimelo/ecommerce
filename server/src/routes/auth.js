const { router } = require('../config/express');
const {
	defaultAuthRoute,
	createOrUpdateUser,
	currentUser,
	refreshToken,
	logout,
	csrfToken,
} = require('../controllers/auth');
const { authCheck, adminCheck } = require('../middlewares/authSecurity');
const csrfProtection = require('../middlewares/csrf');

router.get('/auth', defaultAuthRoute);
router.get('/auth/csrf-token', csrfToken);

router.post('/auth/create-or-update', csrfProtection, authCheck, createOrUpdateUser);
router.post('/auth/current-user', csrfProtection, authCheck, currentUser);
router.post('/auth/current-admin', csrfProtection, authCheck, adminCheck, currentUser);
router.post('/auth/refresh', csrfProtection, refreshToken);
router.post('/auth/logout', csrfProtection, logout);

module.exports = router;
