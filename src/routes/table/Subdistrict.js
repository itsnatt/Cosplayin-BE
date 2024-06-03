const { Router } = require('express');
const router = Router();

const { getSubdistricts, createSubdistrict,getSubdistrictByFk, updateSubdistrict, deleteSubdistrict, getSubdistrictById } = require('../../controllers/table/address/subdistrict.controller');
const verifyToken = require('../../middleware');

router.get('/address/subdistrict', getSubdistricts);
router.get('/address/subdistrict/:id', getSubdistrictByFk);
router.get('/address/subdistrict/id/:id', getSubdistrictById);

router.post('/address/subdistrict', createSubdistrict);
router.delete('/address/subdistrict/:id', deleteSubdistrict);
router.put('/address/subdistrict/:id', updateSubdistrict);

module.exports = router;
