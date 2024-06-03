// controllers/user.controller.js
const pool = require('../../middleware/db');

// Menampilkan semua pengguna
const getUsers = async (req, res) => {
    try {
        const users = await pool.query('SELECT * FROM "User"');
        res.json(users.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menampilkan pengguna berdasarkan ID
const getUserById = async(req,res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('SELECT * FROM "User" WHERE "UserID" = $1',[id]);
        res.json(response.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menambahkan pengguna baru
const createUser = async (req, res) => {
    const { FullName, Username, Uid, Email, AddressID_fk } = req.body;
    const RoleID_fk = 0;
    try {
        const newUser = await pool.query(
            'INSERT INTO "User" ("FullName", "Username", "Uid", "Email", "RoleID_fk", "AddressID_fk") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [FullName, Username, Uid, Email, RoleID_fk, AddressID_fk]
        );
        res.status(201).json(newUser.rows[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Mengupdate pengguna
const updateUser = async (req, res) => {
    const id = req.params.id;
    const { FullName, Username, Email, RoleID_fk, AddressID_fk } = req.body;
    const currentTime = new Date(); // Waktu saat ini

    try {
        const updatedUser = await pool.query(
            'UPDATE "User" SET "FullName" = $1, "Username" = $2, "Email" = $3, "RoleID_fk" = $4, "AddressID_fk" = $5, "EditTime" = $6 WHERE "UserID" = $7 RETURNING *',
            [FullName, Username, Email, RoleID_fk, AddressID_fk, currentTime, id]
        );
        res.json(updatedUser.rows[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menghapus pengguna
const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await pool.query('DELETE FROM "User" WHERE "UserID" = $1', [id]);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
