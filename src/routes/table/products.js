const { Router } = require('express');
const router = Router();

const {getProducts,getProductById, addProduct, updateProduct,deleteProduct } = require('../../controllers/table/product/product.controller');
const verifyToken = require('../../middleware');

router.get('/products/products', getProducts);
router.get('/products/products/:id', getProductById);
router.post('/products/products', addProduct);
router.delete('/products/products/:id', deleteProduct);
router.put('/products/products/:id', updateProduct);

module.exports = router;