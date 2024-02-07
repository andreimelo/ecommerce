const { router } = require('../config/express');
const { authCheck, adminCheck } = require('../middlewares/authSecurity');
const { create, read } = require('../controllers/product');

//routes
router.post('/product', authCheck, adminCheck, create);
router.get('/products', read);

module.exports = router;
