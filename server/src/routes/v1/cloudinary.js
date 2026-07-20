const { router } = require('../../config/express');
const { authCheck, adminCheck } = require('../../middlewares/authSecurity');
const csrfProtection = require('../../middlewares/csrf');
const { upload, remove } = require('../../controllers/cloudinary');

router.post('/upload-images', authCheck, csrfProtection, adminCheck, upload);
router.post('/remove-image', authCheck, csrfProtection, adminCheck, remove);

module.exports = router;
