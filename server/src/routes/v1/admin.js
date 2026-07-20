const { router } = require('../../config/express');
const { authCheck, adminCheck } = require('../../middlewares/authSecurity');
const { orders, orderStatus, updateUser, removeUser } = require('../../controllers/admin');

router.get('/admin/orders', authCheck, adminCheck, orders);
router.put('/admin/order-status', authCheck, adminCheck, orderStatus);
router.put('/admin/user/:userId/edit',authCheck, adminCheck, updateUser);
router.delete('/admin/user/:userId', authCheck, adminCheck, removeUser);

module.exports = router;
