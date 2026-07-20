const { router } = require('../../config/express');
const { authCheck, adminCheck } = require('../../middlewares/authSecurity');
const csrfProtection = require('../../middlewares/csrf');
const { create, read, update, remove, list } = require('../../controllers/sub-category');

//routes
router.post('/sub-category', authCheck, csrfProtection, adminCheck, create);
router.get('/sub-categories', list);
router.get('/sub-category/:slug', read);
router.put('/sub-category/:slug', authCheck, csrfProtection, adminCheck, update);
router.delete('/sub-category/:slug', authCheck, csrfProtection, adminCheck, remove);

module.exports = router;
