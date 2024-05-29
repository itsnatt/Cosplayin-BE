const { Router } = require('express');
const router = Router();

const { getSubdistricts, createSubdistrict, updateSubdistrict, deleteSubdistrict, getSubdistrictById } = require('../../controllers/table/address/subdistrict.controller');
const verifyToken = require('../../middleware');

router.get('/address/subdistrict', getSubdistricts);
router.get('/address/subdistrict/:id', getSubdistrictById);
router.post('/address/subdistrict', createSubdistrict);
router.delete('/address/subdistrict/:id', deleteSubdistrict);
router.put('/address/subdistrict/:id', updateSubdistrict);

module.exports = router;
