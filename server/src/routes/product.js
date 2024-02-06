const { router } = require('../config/express');
const { authCheck, adminCheck } = require('../middlewares/authSecurity');
const { create } = require('../controllers/product');

//routes
router.post('/product', authCheck, adminCheck, create);

module.exports = router;
