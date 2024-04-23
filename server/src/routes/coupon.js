const { router } = require('../config/express');
const { create, remove, list } = require('../controllers/coupon');
const { authCheck, adminCheck } = require('../middlewares/authSecurity');

router.post('/coupon', authCheck, adminCheck, create);
router.get('/coupons', authCheck, adminCheck, list);
router.delete('/coupon/:couponId', authCheck, adminCheck, remove);

module.exports = router;
