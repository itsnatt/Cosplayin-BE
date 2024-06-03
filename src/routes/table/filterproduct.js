const { Router } = require('express');
const router = Router();

const { getFilteredProducts } = require('../../controllers/table/product/filterproduct');

const verifyToken = require('../../middleware');

router.get('/products/filterproduct', getFilteredProducts);


module.exports = router;
