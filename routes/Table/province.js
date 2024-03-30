const { Router } = require('express');
const router = Router();

const { getProvinces, createProvince, updateProvince, deleteProvince, getProvincesById } = require('../../controllers/Table/province.controller');

router.get('/province', getProvinces);
router.get('/province/:id', getProvincesById);
router.post('/province', createProvince);
router.delete('/province/:id', deleteProvince);
router.put('/province/:id', updateProvince);

module.exports = router;
