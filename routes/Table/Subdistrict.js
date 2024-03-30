const { Router } = require('express');
const router = Router();

const { getSubdistricts, createSubdistrict, updateSubdistrict, deleteSubdistrict, getSubdistrictById } = require('../../controllers/Table/subdistrict.controller');

router.get('/subdistrict', getSubdistricts);
router.get('/subdistrict/:id', getSubdistrictById);
router.post('/subdistrict', createSubdistrict);
router.delete('/subdistrict/:id', deleteSubdistrict);
router.put('/subdistrict/:id', updateSubdistrict);

module.exports = router;
