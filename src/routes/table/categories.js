const { Router } = require('express');
const router = Router();

const { getCategories, getCategoriesbyid, addCategory, deleteCategory, updateCategory } = require('../../controllers/table/picker/category.controller');
const verifyToken = require('../../middleware');

router.get('/picker/categories', getCategories);
router.get('/picker/categories/:id', getCategoriesbyid);
router.post('/picker/categories', addCategory);
router.delete('/picker/categories/:id', deleteCategory);
router.put('/picker/categories/:id', updateCategory);

module.exports = router;
