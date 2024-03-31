// controllers/favorite.controller.js
const pool = require('../../middleware/db');

// Menampilkan semua favorite
const getFavorites = async (req, res) => {
    try {
        const favorites = await pool.query('SELECT * FROM "Favorite"');
        res.json(favorites.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menampilkan favorite berdasarkan ID
const getFavoriteById = async(req,res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('SELECT * FROM "Favorite" WHERE "FavoriteID" = $1',[id]);
        res.json(response.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menambahkan favorite baru
const createFavorite = async (req, res) => {
    const { ProductID_fk, UserID_fk } = req.body;
    try {
        const newFavorite = await pool.query(
            'INSERT INTO "Favorite" ("ProductID_fk", "UserID_fk") VALUES ($1, $2) RETURNING *',
            [ProductID_fk, UserID_fk]
        );
        res.status(201).json(newFavorite.rows[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menghapus favorite
const deleteFavorite = async (req, res) => {
    const id = req.params.id;
    try {
        await pool.query('DELETE FROM "Favorite" WHERE "FavoriteID" = $1', [id]);
        res.json({ message: 'Favorite deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getFavorites,
    getFavoriteById,
    createFavorite,
    deleteFavorite
};
