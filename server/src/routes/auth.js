const { router } = require('../config/express');

router.get('/auth', (req, res) => {
	return res.json({ data: 'This is auth route' });
});

module.exports = router;
