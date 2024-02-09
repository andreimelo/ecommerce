const { router } = require('../config/express');
const { authCheck, adminCheck } = require('../middlewares/authSecurity');
const { upload, remove } = require('../controllers/cloudinary');

router.post('/upload-images', authCheck, adminCheck, upload);
router.post('/remove-image', authCheck, adminCheck, remove);

module.exports = router;
