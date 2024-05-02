const { router } = require('../config/express');
const { createPaymentIntent } = require('../controllers/stripe');
const { authCheck } = require('../middlewares/authSecurity');

router.post('/payment/intent', authCheck, createPaymentIntent);

module.exports = router;
