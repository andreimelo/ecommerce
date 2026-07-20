const { router } = require('../../config/express');
const { authCheck, adminCheck } = require('../../middlewares/authSecurity');
const csrfProtection = require('../../middlewares/csrf');
const { orders, orderStatus, updateUser, removeUser } = require('../../controllers/admin');

router.get('/admin/orders', authCheck, adminCheck, orders);
router.put('/admin/order-status', authCheck, csrfProtection, adminCheck, orderStatus);
router.put('/admin/user/:userId/edit', authCheck, csrfProtection, adminCheck, updateUser);
router.delete('/admin/user/:userId', authCheck, csrfProtection, adminCheck, removeUser);

module.exports = router;
