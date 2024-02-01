const { router } = require('../config/express');
const { authCheck, adminCheck } = require('../middlewares/authSecurity');
const { create, read, update, remove, list } = require('../controllers/sub-category');

//routes
router.post('/sub-category', authCheck, adminCheck, create);
router.get('/sub-categories', list);
router.get('/sub-category/:slug', read);
router.put('/sub-category/:slug', authCheck, adminCheck, update);
router.delete('/sub-category/:slug', authCheck, adminCheck, remove);

module.exports = router;
