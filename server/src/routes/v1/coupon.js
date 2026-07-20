const { router } = require('../../config/express');
const { create, remove, list, update } = require('../../controllers/coupon');
const { authCheck, adminCheck } = require('../../middlewares/authSecurity');
const csrfProtection = require('../../middlewares/csrf');

router.post('/coupon', authCheck, csrfProtection, adminCheck, create);
router.get('/coupons', authCheck, adminCheck, list);
router.put('/coupon/:couponId', authCheck, csrfProtection, adminCheck, update);
router.delete('/coupon/:couponId', authCheck, csrfProtection, adminCheck, remove);

module.exports = router;
