const { Router } = require('express');
const router = Router();

const {     getFavorites,
    getFavoriteById,
    createFavorite,
    deleteFavorite } = require('../../controllers/Table/favorite.controller');

router.get('/favorite', getFavorites);
router.get('/favorite/:id', getFavoriteById);
router.post('/favorite', createFavorite);
router.delete('/favorite/:id', deleteFavorite);

module.exports = router;
