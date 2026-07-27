const { router } = require('../../config/express');
const { authCheck, adminCheck } = require('../../middlewares/authSecurity');
const csrfProtection = require('../../middlewares/csrf');
const {
	create,
	read,
	update,
	remove,
	list,
	getSubCategory,
} = require('../../controllers/category');

//routes
router.post('/category', authCheck, csrfProtection, adminCheck, create);
router.get('/categories', list);
router.get('/category/:slug', read);
router.put('/category/:slug', authCheck, csrfProtection, adminCheck, update);
router.delete('/category/:slug', authCheck, csrfProtection, adminCheck, remove);
router.get('/category/sub-category/:id', getSubCategory);

module.exports = router;
