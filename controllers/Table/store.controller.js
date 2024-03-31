// controllers/store.controller.js
const pool = require('../../middleware/db');

// Menampilkan semua toko
const getStores = async (req, res) => {
    try {
        const stores = await pool.query('SELECT * FROM "Store"');
        res.json(stores.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menampilkan toko berdasarkan ID
const getStoreById = async(req,res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('SELECT * FROM "Store" WHERE "StoreID" = $1',[id]);
        res.json(response.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menambahkan toko baru
const createStore = async (req, res) => {
    const { StoreName, Instagram, WhatsApp, Description, StatusID_fk, UserID_fk, AddressID_fk } = req.body;
    try {
        const newStore = await pool.query(
            'INSERT INTO "Store" ("StoreName", "Instagram", "WhatsApp", "Description", "StatusID_fk", "UserID_fk", "AddressID_fk") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [StoreName, Instagram, WhatsApp, Description, StatusID_fk, UserID_fk, AddressID_fk]
        );
        res.status(201).json(newStore.rows[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Mengupdate toko
const updateStore = async (req, res) => {
    const id = req.params.id;
    const { StoreName, Instagram, WhatsApp, Description, StatusID_fk, UserID_fk, AddressID_fk } = req.body;
    const currentTime = new Date(); // Waktu saat ini

    try {
        const updatedStore = await pool.query(
            'UPDATE "Store" SET "StoreName" = $1, "Instagram" = $2, "WhatsApp" = $3, "Description" = $4, "StatusID_fk" = $5, "UserID_fk" = $6, "AddressID_fk" = $7, "EditTime" = $8 WHERE "StoreID" = $9 RETURNING *',
            [StoreName, Instagram, WhatsApp, Description, StatusID_fk, UserID_fk, AddressID_fk, currentTime, id]
        );
        res.json(updatedStore.rows[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menghapus toko
const deleteStore = async (req, res) => {
    const id = req.params.id;
    try {
        await pool.query('DELETE FROM "Store" WHERE "StoreID" = $1', [id]);
        res.json({ message: 'Store deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getStores,
    getStoreById,
    createStore,
    updateStore,
    deleteStore
};
