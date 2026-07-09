const { router } = require('../../config/express');

router.use('/cloudinary', require('./cloudinary'));
router.use('/admin', require('./admin'));
router.use('/auth', require('./auth'));
router.use('/category', require('./category'));
router.use('/sub-category', require('./sub-category'));
router.use('/coupon', require('./coupon'));
router.use('/stripe', require('./stripe'));
router.use('/user', require('./user'));
router.use('/product', require('./product'));

module.exports = router;