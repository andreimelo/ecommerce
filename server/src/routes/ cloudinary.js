const { router } = require('../config/express');
const { authCheck, adminCheck } = require('../middlewares/authSecurity');
const { upload, remove } = require('../controllers/cloudinary');

router.post('/uploadImages', authCheck, adminCheck, upload);
router.post('/removeImage', authCheck, adminCheck, remove);

module.exports = router;
