const { Router } = require('express');
const router = Router();

const { getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct } = require('../../controllers/Table/product.controller');

router.get('/product', getProducts);
router.get('/product/:id', getProductById);
router.post('/product', createProduct);
router.delete('/product/:id', deleteProduct);
router.put('/product/:id', updateProduct);

module.exports = router;
