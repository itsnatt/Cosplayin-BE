const { Router } = require('express');
const router = Router();

const { getProvinces, createProvince, updateProvince, deleteProvince, getProvincesById } = require('../../controllers/table/address/province.controller');
const verifyToken = require('../../middleware');

router.get('/province', getProvinces);
router.get('/province/:id',verifyToken, getProvincesById);
router.post('/province',verifyToken, createProvince);
router.delete('/province/:id',verifyToken, deleteProvince);
router.put('/province/:id', verifyToken, updateProvince);

module.exports = router;
