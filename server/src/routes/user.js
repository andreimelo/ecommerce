const { router } = require('../config/express');
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
} = require('../controllers/user');
const { authCheck, adminCheck } = require('../middlewares/authSecurity');

router.get('/user', (req, res) => {
	return res.json({ data: 'This is user route' });
});
router.post('/user/save-cart', authCheck, userCart);
router.get('/user/save-cart', authCheck, getUserCart);
router.delete('/user/save-cart', authCheck, emptyCart);
router.get('/user/accounts', authCheck, adminCheck, list);
router.post('/user/address', authCheck, saveAddress);
router.post('/user/cart/coupon', authCheck, applyCouponToCart);
router.post('/user/order', authCheck, createOrder); // stripe
router.post('/user/cash-order', authCheck, createCashOrder); //cod
router.get('/user/orders', authCheck, orders);
router.post('/user/wishlist', authCheck, addToWishList);
router.get('/user/wishlist', authCheck, wishList);
router.put('/user/wishlist/:productId', authCheck, removeFromWishList);

module.exports = router;
