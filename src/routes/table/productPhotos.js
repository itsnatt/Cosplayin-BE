const { Router } = require('express');
const router = Router();

const { getProductPhotos, addProductPhoto, deleteProductPhoto } = require('../../controllers/table/product/product_photo.controller');

const verifyToken = require('../../middleware');

router.get('/products/productPhotos/:id', getProductPhotos);
router.post('/products/productPhotos', addProductPhoto);
router.delete('/products/productPhotos/:id', deleteProductPhoto);

module.exports = router;
