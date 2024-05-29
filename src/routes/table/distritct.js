const { Router } = require('express');
const router = Router();

const { getDistricts, createDistrict, updateDistrict, deleteDistrict, getDistrictById } = require('../../controllers/table/address/district.controller');
const verifyToken = require('../../middleware');

router.get('/address/district', getDistricts);
router.get('/address/district/:id', getDistrictById);
router.post('/address/district', createDistrict);
router.delete('/address/district/:id', deleteDistrict);
router.put('/address/district/:id', updateDistrict);

module.exports = router;
