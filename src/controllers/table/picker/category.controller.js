const pool = require('../../../middleware/db');

// Menampilkan semua kategori
const getCategories = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Category"');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getCategoriesbyid = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM "Category" WHERE "CategoryID" = $1',[id]);
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// Menambahkan kategori baru
const addCategory = async (req, res) => {
    const { Category } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO "Category" ("Category") VALUES ($1) RETURNING *',
            [Category]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Mengupdate kategori
const updateCategory = async (req, res) => {
    const { CategoryID } = req.params;
    const { Category } = req.body;
    try {
        const result = await pool.query(
            'UPDATE "Category" SET "Category" = $1, "EditTime" = CURRENT_TIMESTAMP WHERE "CategoryID" = $2 RETURNING *',
            [Category, CategoryID]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Menghapus kategori
const deleteCategory = async (req, res) => {
    const { CategoryID } = req.params;
    try {
        const result = await pool.query(
            'DELETE FROM "Category" WHERE "CategoryID" = $1 RETURNING *',
            [CategoryID]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status500().json({ error: err.message });
    }
};

module.exports = {
    getCategories,
    getCategoriesbyid,
    addCategory,
    updateCategory,
    deleteCategory,
};
