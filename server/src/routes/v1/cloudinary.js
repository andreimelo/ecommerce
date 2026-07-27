const { router } = require('../../config/express');
const { authCheck, adminCheck } = require('../../middlewares/authSecurity');
const csrfProtection = require('../../middlewares/csrf');
const { upload, remove, uploadReviewImage, removeReviewImage } = require('../../controllers/cloudinary');

router.post('/upload-images', authCheck, csrfProtection, adminCheck, upload);
router.post('/remove-image', authCheck, csrfProtection, adminCheck, remove);
router.post('/upload-review-image', authCheck, csrfProtection, uploadReviewImage);
router.post('/remove-review-image', authCheck, csrfProtection, removeReviewImage);

module.exports = router;
