const { router } = require('../config/express');
const { defaultAuthRoute } = require('../controllers/auth');

router.get('/auth', defaultAuthRoute);

module.exports = router;
