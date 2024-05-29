// controllers/address.controller.js
const pool = require('../../../middleware/db');

// Menampilkan semua alamat
const getAddresses = async (req, res) => {
    try {
        const addresses = await pool.query('SELECT * FROM "Address"');
        res.json(addresses.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menampilkan alamat berdasarkan ID
const getAddressById = async(req,res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('SELECT * FROM "Address" WHERE "AddressID" = $1',[id]);
        res.json(response.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menambahkan alamat baru
const createAddress = async (req, res) => {
    const { Address, Address2, SubdistrictID_fk } = req.body;
    try {
        const newAddress = await pool.query(
            'INSERT INTO "Address" ("Address", "Address2", "SubdistrictID_fk") VALUES ($1, $2, $3) RETURNING *',
            [Address, Address2, SubdistrictID_fk]
        );
        res.status(201).json(newAddress.rows[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Mengupdate alamat
const updateAddress = async (req, res) => {
    const id = req.params.id;
    const { Address, Address2, SubdistrictID_fk } = req.body;
    const currentTime = new Date(); // Waktu saat ini

    try {
        const updatedAddress = await pool.query(
            'UPDATE "Address" SET "Address" = $1, "Address2" = $2, "SubdistrictID_fk" = $3, "EditTime" = $4 WHERE "AddressID" = $5 RETURNING *',
            [Address, Address2, SubdistrictID_fk, currentTime, id]
        );
        res.json(updatedAddress.rows[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menghapus alamat
const deleteAddress = async (req, res) => {
    const id = req.params.id;
    try {
        await pool.query('DELETE FROM "Address" WHERE "AddressID" = $1', [id]);
        res.json({ message: 'Address deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getAddresses,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress
};
