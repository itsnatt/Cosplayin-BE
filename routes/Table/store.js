const { Router } = require('express');
const router = Router();

const {    getStores,
    getStoreById,
    createStore,
    updateStore,
    deleteStore} = require('../../controllers/Table/store.controller');

router.get('/store', getStores);
router.get('/store/:id', getStoreById);
router.post('/store', createStore);
router.delete('/store/:id', deleteStore);
router.put('/store/:id', updateStore);

module.exports = router;
