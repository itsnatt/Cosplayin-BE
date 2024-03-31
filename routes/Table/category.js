const { Router } = require('express');
const router = Router();

const {    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory } = require('../../controllers/Table/category.controller');

router.get('/category', getCategories);
router.get('/category/:id', getCategoryById);
router.post('/category', createCategory);
router.delete('/category/:id', deleteCategory);
router.put('/category/:id', updateCategory);

module.exports = router;
