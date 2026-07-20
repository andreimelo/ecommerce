const { router } = require('../../config/express');
const { createPaymentIntent } = require('../../controllers/stripe');
const { authCheck } = require('../../middlewares/authSecurity');
const csrfProtection = require('../../middlewares/csrf');

router.post('/payment/intent', authCheck, csrfProtection, createPaymentIntent);

module.exports = router;
