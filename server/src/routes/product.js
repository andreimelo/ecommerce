const { router } = require('../config/express');
const { authCheck, adminCheck } = require('../middlewares/authSecurity');
const {
	create,
	list,
	remove,
	read,
	update,
	listAll,
	// productsCount,
} = require('../controllers/product');

//routes
router.post('/product', authCheck, adminCheck, create);
// router.get('/products/total', productsCount);
router.get('/products/:count', list);
router.delete('/product/:slug', authCheck, adminCheck, remove);
router.get('/product/:slug', read);
router.put('/product/:slug', authCheck, adminCheck, update);
router.post('/products', listAll);

module.exports = router;
