const { Router } = require('express');
const router = Router();

const { getAddresses, getAddressById, createAddress, deleteAddress, updateAddress } = require('../../controllers/table/address/address.controller');
const verifyToken = require('../../middleware');

router.get('/address', getAddresses);
router.get('/address/:id', getAddressById);
router.post('/address', createAddress);
router.delete('/address/:id', deleteAddress);
router.put('/address/:id', updateAddress);

module.exports = router;
