const { router } = require('../config/express');
const { defaultAuthRoute, createOrUpdateUser } = require('../controllers/auth');
const { authCheck } = require('../middlewares/authSecurity');

router.get('/auth', defaultAuthRoute);

router.post('/auth/create-or-update', authCheck, createOrUpdateUser);

module.exports = router;
