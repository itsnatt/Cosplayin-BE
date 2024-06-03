const { Router } = require('express');
const router = Router();

const { getProductCategories, addProductCategory, deleteProductCategory } = require('../../controllers/table/product/product_category.controller');

const verifyToken = require('../../middleware');

router.get('/products/productCategories/:id', getProductCategories);
router.post('/products/productCategories', addProductCategory);
router.delete('/products/productCategories/:id', deleteProductCategory);

module.exports = router;
