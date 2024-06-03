// controllers/store.controller.js

const pool = require('../../middleware/db');

// Menampilkan semua toko
const getStores = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Store"');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Menampilkan pengguna berdasarkan ID
const getStoresbyid = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM "Store" WHERE "StoreID" = $1',[id]);
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Menambahkan toko baru
const addStore = async (req, res) => {
    const { StoreName, Instagram, WhatsApp, Description, StatusID_fk, UserID_fk, AddressID_fk } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO "Store" ("StoreName", "Instagram", "WhatsApp", "Description", "StatusID_fk", "UserID_fk", "AddressID_fk") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [StoreName, Instagram, WhatsApp, Description, StatusID_fk, UserID_fk, AddressID_fk]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Mengupdate toko
const updateStore = async (req, res) => {
    const id = req.params.id;
    const { StoreName, Instagram, WhatsApp, Description, StatusID_fk, UserID_fk, AddressID_fk } = req.body;
    const currentTime = new Date(); // Waktu saat ini
    try {
        const result = await pool.query(
            'UPDATE "Store" SET "StoreName" = $1, "Instagram" = $2, "WhatsApp" = $3, "Description" = $4, "StatusID_fk" = $5, "UserID_fk" = $6, "AddressID_fk" = $7, "EditTime" = $8 WHERE "StoreID" = $9 RETURNING *',
            [StoreName, Instagram, WhatsApp, Description, StatusID_fk, UserID_fk, AddressID_fk, currentTime, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Store not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// Menghapus toko
const deleteStore = async (req, res) => {
    const { StoreID } = req.params;
    try {
        const result = await pool.query(
            'DELETE FROM "Store" WHERE StoreID = $1 RETURNING *',
            [StoreID]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Store not found' });
        }
        res.status(200).json({ message: 'Store deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getStores,
    addStore,
    updateStore,
    deleteStore,
    getStoresbyid,
};
