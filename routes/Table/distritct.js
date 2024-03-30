const { Router } = require('express');
const router = Router();

const { getDistricts, createDistrict, updateDistrict, deleteDistrict, getDistrictById } = require('../../controllers/Table/district.controller');

router.get('/district', getDistricts);
router.get('/district/:id', getDistrictById);
router.post('/district', createDistrict);
router.delete('/district/:id', deleteDistrict);
router.put('/district/:id', updateDistrict);

module.exports = router;
