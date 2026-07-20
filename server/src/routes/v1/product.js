const { router } = require('../../config/express');
const { authCheck, adminCheck } = require('../../middlewares/authSecurity');
const csrfProtection = require('../../middlewares/csrf');
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
} = require('../../controllers/product');

//routes
router.post('/product', authCheck, csrfProtection, adminCheck, create);
// router.get('/products/total', productsCount);
router.get('/products/:count', list);
router.delete('/product/:slug', authCheck, csrfProtection, adminCheck, remove);
router.get('/product/:slug', read);
router.put('/product/:slug', authCheck, csrfProtection, adminCheck, update);
router.post('/products', listAll);

// rating
router.put('/product/star/:productId', authCheck, csrfProtection, productRatingStar);
//related product
router.get('/product/related/:productId', listRelated);
// search
router.post('/search/filters', searchFilters);

module.exports = router;
