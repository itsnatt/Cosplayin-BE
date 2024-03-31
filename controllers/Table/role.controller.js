// controllers/role.controller.js
const pool = require('../../middleware/db');

// Menampilkan semua peran (roles)
const getRoles = async (req, res) => {
    try {
        const roles = await pool.query('SELECT * FROM "Role"');
        res.json(roles.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menampilkan peran berdasarkan ID
const getRoleById = async(req,res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('SELECT * FROM "Role" WHERE "RoleID" = $1',[id]);
        res.json(response.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menambahkan peran baru
const createRole = async (req, res) => {
    const { RoleName } = req.body;
    const currentTime = new Date(); // Waktu saat ini
    try {
        const newRole = await pool.query(
            'INSERT INTO "Role" ("RoleName", "CreateTime", "EditTime") VALUES ($1, $2, $3) RETURNING *',
            [RoleName, currentTime, currentTime]
        );
        res.status(201).json(newRole.rows[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Mengupdate peran
const updateRole = async (req, res) => {
    const id = req.params.id;
    const { RoleName } = req.body;
    const currentTime = new Date(); // Waktu saat ini
    try {
        const updatedRole = await pool.query(
            'UPDATE "Role" SET "RoleName" = $1, "EditTime" = $2 WHERE "RoleID" = $3 RETURNING *',
            [RoleName, currentTime, id]
        );
        res.json(updatedRole.rows[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menghapus peran
const deleteRole = async (req, res) => {
    const id = req.params.id;
    try {
        await pool.query('DELETE FROM "Role" WHERE "RoleID" = $1', [id]);
        res.json({ message: 'Role deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
};
