const { router } = require('../config/express');
const {
	defaultAuthRoute,
	createOrUpdateUser,
	currentUser,
} = require('../controllers/auth');
const { authCheck } = require('../middlewares/authSecurity');

router.get('/auth', defaultAuthRoute);

router.post('/auth/create-or-update', authCheck, createOrUpdateUser);

router.post('/auth/current-user', authCheck, currentUser);

module.exports = router;
