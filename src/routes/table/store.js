const { Router } = require('express');
const router = Router();

const {getStores,getStoresbyid, addStore, updateStore,deleteStore } = require('../../controllers/table/store.controller');
const verifyToken = require('../../middleware');

router.get('/store', getStores);
router.get('/store/:id', getStoresbyid);
router.post('/store', addStore);
router.delete('/store/:id', deleteStore);
router.put('/store/:id', updateStore);

module.exports = router;
