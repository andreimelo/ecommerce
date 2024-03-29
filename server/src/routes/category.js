const { router } = require('../config/express');
const { authCheck, adminCheck } = require('../middlewares/authSecurity');
const {
	create,
	read,
	update,
	remove,
	list,
	getSubCategory,
} = require('../controllers/category');

//routes
router.post('/category', authCheck, adminCheck, create);
router.get('/categories', list);
router.get('/category/:slug', read);
router.put('/category/:slug', authCheck, adminCheck, update);
router.delete('/category/:slug', authCheck, adminCheck, remove);
router.get('/category/sub-category/:id', getSubCategory);

module.exports = router;
