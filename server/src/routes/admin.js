const { router } = require('../config/express');
const { authCheck, adminCheck } = require('../middlewares/authSecurity');
const { orders, orderStatus } = require('../controllers/admin');

router.get('/admin/orders', authCheck, adminCheck, orders);
router.put('/admin/order-status', authCheck, adminCheck, orderStatus);

module.exports = router;
