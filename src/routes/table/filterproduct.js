const { Router } = require('express');
const router = Router();

const { getFilteredProducts,getProductDetails } = require('../../controllers/table/product/filterproduct');

const verifyToken = require('../../middleware');

router.get('/products/filterproduct', getFilteredProducts);

router.get('/products/details/:id', getProductDetails);

module.exports = router;
