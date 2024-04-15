const { router } = require('../config/express');
const { list, userCart } = require('../controllers/user');
const { authCheck, adminCheck } = require('../middlewares/authSecurity');

router.get('/user', (req, res) => {
	return res.json({ data: 'This is user route' });
});

router.get('/user/accounts', authCheck, adminCheck, list);
router.get('/user/cart', authCheck, userCart);

module.exports = router;
