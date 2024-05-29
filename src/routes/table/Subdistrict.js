const { Router } = require('express');
const router = Router();

const { getSubdistricts, createSubdistrict, updateSubdistrict, deleteSubdistrict, getSubdistrictById } = require('../../controllers/table/address/subdistrict.controller');
const verifyToken = require('../../middleware');

router.get('/subdistrict', getSubdistricts);
router.get('/subdistrict/:id', getSubdistrictById);
router.post('/subdistrict', createSubdistrict);
router.delete('/subdistrict/:id', deleteSubdistrict);
router.put('/subdistrict/:id', updateSubdistrict);

module.exports = router;
