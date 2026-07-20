const { router } = require('../../config/express');
const {
	list,
	userCart,
	getUserCart,
	saveAddress,
	applyCouponToCart,
	createOrder,
	emptyCart,
	orders,
	addToWishList,
	wishList,
	removeFromWishList,
	createCashOrder,
} = require('../../controllers/user');
const { authCheck, adminCheck } = require('../../middlewares/authSecurity');
const csrfProtection = require('../../middlewares/csrf');

router.get('/user', (req, res) => {
	return res.json({ data: 'This is user route' });
});
router.post('/user/save-cart', authCheck, csrfProtection, userCart);
router.get('/user/save-cart', authCheck, getUserCart);
router.delete('/user/save-cart', authCheck, csrfProtection, emptyCart);
router.get('/user/accounts', authCheck, adminCheck, list);
router.post('/user/address', authCheck, csrfProtection, saveAddress);
router.post('/user/cart/coupon', authCheck, csrfProtection, applyCouponToCart);
router.post('/user/order', authCheck, csrfProtection, createOrder); // stripe
router.post('/user/cash-order', authCheck, csrfProtection, createCashOrder); //cod
router.get('/user/orders', authCheck, orders);
router.post('/user/wishlist', authCheck, csrfProtection, addToWishList);
router.get('/user/wishlist', authCheck, wishList);
router.put('/user/wishlist/:productId', authCheck, csrfProtection, removeFromWishList);

module.exports = router;
