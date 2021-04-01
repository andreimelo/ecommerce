const { router } = require('../config/express');

router.get('/user', (req, res) => {
	return res.json({ data: 'This is user route' });
});

module.exports = router;
