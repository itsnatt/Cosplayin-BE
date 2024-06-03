const pool = require('../../../middleware/db');

// Menampilkan semua product_photo
const getProductPhotos = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await pool.query('SELECT * FROM "Product_Photo" WHERE "ProductID_fk" = $1', [id]);
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Menambahkan foto produk baru
const addProductPhoto = async (req, res) => {
    const { ProductID_fk, Photo } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO "Product_Photo" ("ProductID_fk", "Photo") VALUES ($1, $2) RETURNING *',
            [ProductID_fk, Photo]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Menghapus foto produk
const deleteProductPhoto = async (req, res) => {
    const { ProductID_fk, Photo } = req.params;
    try {
        const result = await pool.query(
            'DELETE FROM "Product_Photo" WHERE "ProductID_fk" = $1 AND "Photo" = $2 RETURNING *',
            [ProductID_fk, Photo]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Product_Photo not found' });
        }
        res.status(200).json({ message: 'Product_Photo deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getProductPhotos,
    addProductPhoto,
    deleteProductPhoto,
};
