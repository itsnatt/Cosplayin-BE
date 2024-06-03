const { Router } = require('express');
const router = Router();

const { getSizes, getSizeById, addSize, updateSize, deleteSize } = require('../../controllers/table/picker/size.controller');

const verifyToken = require('../../middleware');

router.get('/picker/sizes', getSizes);
router.get('/picker/sizes/:id', getSizeById);
router.post('/picker/sizes', addSize);
router.delete('/picker/sizes/:id', deleteSize);
router.put('/picker/sizes/:id', updateSize);

module.exports = router;
