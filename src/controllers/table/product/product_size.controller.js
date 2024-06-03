const pool = require('../../../middleware/db');

// Menampilkan semua product_size
const getProductSizes = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM "Product_Size" WHERE "ProductID_fk" = $1', [id]);
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// Menambahkan ukuran produk baru
const addProductSize = async (req, res) => {
    const { ProductID_fk, SizeID_fk } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO "Product_Size" ("ProductID_fk", "SizeID_fk") VALUES ($1, $2) RETURNING *',
            [ProductID_fk, SizeID_fk]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Menghapus ukuran produk
const deleteProductSize = async (req, res) => {
    const { ProductID_fk, SizeID_fk } = req.params;
    try {
        const result = await pool.query(
            'DELETE FROM "Product_Size" WHERE "ProductID_fk" = $1 AND "SizeID_fk" = $2 RETURNING *',
            [ProductID_fk, SizeID_fk]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Product_Size not found' });
        }
        res.status(200).json({ message: 'Product_Size deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getProductSizes,
    addProductSize,
    deleteProductSize,
};
