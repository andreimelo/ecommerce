const { router } = require('../config/express');
const { authCheck, adminCheck } = require('../middlewares/authSecurity');
const { create, list, remove } = require('../controllers/product');

//routes
router.post('/product', authCheck, adminCheck, create);
router.get('/products/:count', list);
router.delete('/product/:slug', authCheck, adminCheck, remove);

module.exports = router;
