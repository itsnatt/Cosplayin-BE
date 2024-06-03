const pool = require('../../../middleware/db');
// Menampilkan semua product_category
const getProductCategories = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await pool.query('SELECT * FROM "Product_Category" WHERE "ProductID_fk" = $1', [id]);
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Menambahkan kategori produk baru
const addProductCategory = async (req, res) => {
    const { ProductID_fk, CategoryID_fk } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO "Product_Category" ("ProductID_fk", "CategoryID_fk") VALUES ($1, $2) RETURNING *',
            [ProductID_fk, CategoryID_fk]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Menghapus kategori produk
const deleteProductCategory = async (req, res) => {
    const { ProductID_fk, CategoryID_fk } = req.params;
    try {
        const result = await pool.query(
            'DELETE FROM "Product_Category" WHERE "ProductID_fk" = $1 AND "CategoryID_fk" = $2 RETURNING *',
            [ProductID_fk, CategoryID_fk]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Product_Category not found' });
        }
        res.status(200).json({ message: 'Product_Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getProductCategories,
    addProductCategory,
    deleteProductCategory,
};