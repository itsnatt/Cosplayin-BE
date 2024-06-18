const { Router } = require('express');
const router = Router();

const { getMerchant, updateMerchant } = require('../../controllers/merchantdash/merchantController');

router.get('/merchantdsh/:id', getMerchant);
router.put('/merchantdsh/:id', updateMerchant);

module.exports = router;
