const { router } = require('../../config/express');
const { shoppingAssistant } = require('../../controllers/ai');

router.post('/shopping-assistant', shoppingAssistant);

module.exports = router;
