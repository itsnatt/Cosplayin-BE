const express = require('express');
const router = express.Router();
const provinceController = require('../controllers/provinceController');

// Definisikan rute-rute yang ingin ditangani
router.get('/', provinceController.getAllProvinces);
router.get('/:id', provinceController.getProvinceById);
router.post('/', provinceController.createProvince);
router.put('/:id', provinceController.updateProvince); // Perbaikan disini
router.delete('/:id', provinceController.deleteProvince); // Perbaikan disini

module.exports = router;
