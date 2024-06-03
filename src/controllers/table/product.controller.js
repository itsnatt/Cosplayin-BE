const pool = require('../middleware/db');

// Menampilkan semua produk
const getProducts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Product"');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Menampilkan produk berdasarkan ID
const getProductById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM "Product" WHERE "ProductID" = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Menambahkan produk baru
const addProduct = async (req, res) => {
    const { Title, Description, Unit, Price, StatusID_fk, Stock, StoreID_fk } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO "Product" ("Title", "Description", "Unit", "Price", "StatusID_fk", "Stock", "StoreID_fk") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [Title, Description, Unit, Price, StatusID_fk, Stock, StoreID_fk]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Mengupdate produk
const updateProduct = async (req, res) => {
    const id = req.params.id;
    const { Title, Description, Unit, Price, StatusID_fk, Stock, StoreID_fk, Click } = req.body;
    try {
        const result = await pool.query(
            'UPDATE "Product" SET "Title" = $1, "Description" = $2, "Unit" = $3, "Price" = $4, "StatusID_fk" = $5, "Stock" = $6, "StoreID_fk" = $7, "Click" = $8, "EditTime" = CURRENT_TIMESTAMP WHERE "ProductID" = $9 RETURNING *',
            [Title, Description, Unit, Price, StatusID_fk, Stock, StoreID_fk, Click, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Menghapus produk
const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query(
            'DELETE FROM "Product" WHERE "ProductID" = $1 RETURNING *',
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
};
