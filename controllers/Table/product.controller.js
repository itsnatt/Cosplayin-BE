// controllers/product.controller.js
const pool = require('../../middleware/db');

// Menampilkan semua produk
const getProducts = async (req, res) => {
    try {
        const products = await pool.query('SELECT * FROM "Product"');
        res.json(products.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menampilkan produk berdasarkan ID
const getProductById = async(req,res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('SELECT * FROM "Product" WHERE "ProductID" = $1',[id]);
        res.json(response.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menambahkan produk baru
const createProduct = async (req, res) => {
    const { Title, Description, unit, Price, StatusID_fk, Stock, Size1, Size2, Size3, Photo1, Photo2, Photo3, CategoryID_fk, StoreID_fk } = req.body;
    const currentTime = new Date(); // Waktu saat ini

    try {
        const newProduct = await pool.query(
            'INSERT INTO "Product" ("Title", "Description", "unit", "Price", "StatusID_fk", "Stock", "Size1", "Size2", "Size3", "Photo1", "Photo2", "Photo3", "CategoryID_fk", "StoreID_fk", "CreateTime", "EditTime", "click") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *',
            [Title, Description, unit, Price, StatusID_fk, Stock, Size1, Size2, Size3, Photo1, Photo2, Photo3, CategoryID_fk, StoreID_fk, currentTime, currentTime, 0]
        );
        res.status(201).json(newProduct.rows[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Mengupdate produk
const updateProduct = async (req, res) => {
    const id = req.params.id;
    const { Title, Description, unit, Price, StatusID_fk, Stock, Size1, Size2, Size3, Photo1, Photo2, Photo3, CategoryID_fk, StoreID_fk } = req.body;
    const currentTime = new Date(); // Waktu saat ini

    try {
        const updatedProduct = await pool.query(
            'UPDATE "Product" SET "Title" = $1, "Description" = $2, "unit" = $3, "Price" = $4, "StatusID_fk" = $5, "Stock" = $6, "Size1" = $7, "Size2" = $8, "Size3" = $9, "Photo1" = $10, "Photo2" = $11, "Photo3" = $12, "CategoryID_fk" = $13, "StoreID_fk" = $14, "EditTime" = $15 WHERE "ProductID" = $16 RETURNING *',
            [Title, Description, unit, Price, StatusID_fk, Stock, Size1, Size2, Size3, Photo1, Photo2, Photo3, CategoryID_fk, StoreID_fk, currentTime, id]
        );
        res.json(updatedProduct.rows[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menghapus produk
const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        await pool.query('DELETE FROM "Product" WHERE "ProductID" = $1', [id]);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
