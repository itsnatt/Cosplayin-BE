const { Router } = require('express');
const router = Router();

const { getAddresses, getAddressById, createAddress, deleteAddress, updateAddress } = require('../../controllers/table/address/address.controller');
const verifyToken = require('../../middleware');

router.get('/address/address', getAddresses);
router.get('/address/address/:id', getAddressById);
router.post('/address/address', createAddress);
router.delete('/address/address/:id', deleteAddress);
router.put('/address/address/:id', updateAddress);

module.exports = router;
