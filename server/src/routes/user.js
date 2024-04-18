const { router } = require('../config/express');
const { list, userCart, getUserCart } = require('../controllers/user');
const { authCheck, adminCheck } = require('../middlewares/authSecurity');

router.get('/user', (req, res) => {
	return res.json({ data: 'This is user route' });
});
router.post('/user/save-cart', authCheck, userCart);
router.get('/user/save-cart', authCheck, getUserCart);
router.get('/user/accounts', authCheck, adminCheck, list);

module.exports = router;
