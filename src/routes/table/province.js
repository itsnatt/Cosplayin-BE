const { Router } = require('express');
const router = Router();

const { getProvinces, createProvince, updateProvince, deleteProvince, getProvincesById } = require('../../controllers/table/address/province.controller');
const verifyToken = require('../../middleware');

router.get('/address/province', getProvinces);
router.get('/address/province/:id',verifyToken, getProvincesById);
router.post('/address/province',verifyToken, createProvince);
router.delete('/address/province/:id',verifyToken, deleteProvince);
router.put('/address/province/:id', verifyToken, updateProvince);

module.exports = router;
