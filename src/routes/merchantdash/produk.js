const { Router } = require('express');
const router = Router();

const { createProduct, updateProduct, deleteProduct, listProducts } = require('../../controllers/merchantdash/MerchantProductController');

router.get('/merchantdsh/product/:userId', listProducts);
router.post('/merchantdsh/product', createProduct);
router.put('/merchantdsh/product/:id', updateProduct);
router.delete('/merchantdsh/product/:id', deleteProduct);
module.exports = router;
