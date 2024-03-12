const { router } = require('../config/express');
const { list } = require('../controllers/user');
const { authCheck, adminCheck } = require('../middlewares/authSecurity');

router.get('/user', (req, res) => {
	return res.json({ data: 'This is user route' });
});

router.get('/user/accounts', authCheck, adminCheck, list);

module.exports = router;
