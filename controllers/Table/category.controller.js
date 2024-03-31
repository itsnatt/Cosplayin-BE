// controllers/category.controller.js
const pool = require('../../middleware/db');

// Menampilkan semua kategori
const getCategories = async (req, res) => {
    try {
        const categories = await pool.query('SELECT * FROM "Category"');
        res.json(categories.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menampilkan kategori berdasarkan ID
const getCategoryById = async(req,res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('SELECT * FROM "Category" WHERE "CategoryID" = $1',[id]);
        res.json(response.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menambahkan kategori baru
const createCategory = async (req, res) => {
    const { Category } = req.body;
    const currentTime = new Date(); // Waktu saat ini
    try {
        const newCategory = await pool.query(
            'INSERT INTO "Category" ("Category", "CreateTime", "EditTime") VALUES ($1, $2, $3) RETURNING *',
            [Category, currentTime, currentTime]
        );
        res.status(201).json(newCategory.rows[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Mengupdate kategori
const updateCategory = async (req, res) => {
    const id = req.params.id;
    const { Category } = req.body;
    const currentTime = new Date(); // Waktu saat ini
    try {
        const updatedCategory = await pool.query(
            'UPDATE "Category" SET "Category" = $1, "EditTime" = $2 WHERE "CategoryID" = $3 RETURNING *',
            [Category, currentTime, id]
        );
        res.json(updatedCategory.rows[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menghapus kategori
const deleteCategory = async (req, res) => {
    const id = req.params.id;
    try {
        await pool.query('DELETE FROM "Category" WHERE "CategoryID" = $1', [id]);
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
