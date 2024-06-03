const { Router } = require('express');
const router = Router();

const { getProductSizes, addProductSize, deleteProductSize } = require('../../controllers/table/product/product_size.controller');

const verifyToken = require('../../middleware');

router.get('/products/productSizes/:id', getProductSizes);
router.post('/products/productSizes', addProductSize);
router.delete('/products/productSizes/:id', deleteProductSize);

module.exports = router;
