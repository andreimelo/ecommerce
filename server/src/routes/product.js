const { router } = require('../config/express');
const { authCheck, adminCheck } = require('../middlewares/authSecurity');
const {
	create,
	list,
	remove,
	read,
	update,
	listAll,
	productRatingStar,
	listRelated,
	searchFilters,
} = require('../controllers/product');

//routes
router.post('/product', authCheck, adminCheck, create);
// router.get('/products/total', productsCount);
router.get('/products/:count', list);
router.delete('/product/:slug', authCheck, adminCheck, remove);
router.get('/product/:slug', read);
router.put('/product/:slug', authCheck, adminCheck, update);
router.post('/products', listAll);

// rating
router.put('/product/star/:productId', authCheck, productRatingStar);
//related product
router.get('/product/related/:productId', listRelated);
// search
router.post('/search/filters', searchFilters);

module.exports = router;
