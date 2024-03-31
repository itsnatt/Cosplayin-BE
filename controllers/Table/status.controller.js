// controllers/status.controller.js
const pool = require('../../middleware/db');

// Menampilkan semua status
const getStatuses = async (req, res) => {
    try {
        const statuses = await pool.query('SELECT * FROM "Status"');
        res.json(statuses.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menampilkan status berdasarkan ID
const getStatusById = async(req,res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('SELECT * FROM "Status" WHERE "StatusID" = $1',[id]);
        res.json(response.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menambahkan status baru
const createStatus = async (req, res) => {
    const { StatusName } = req.body;
    try {
        const newStatus = await pool.query(
            'INSERT INTO "Status" ("StatusName") VALUES ($1) RETURNING *',
            [StatusName]
        );
        res.status(201).json(newStatus.rows[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Mengupdate status
const updateStatus = async (req, res) => {
    const id = req.params.id;
    const { StatusName } = req.body;
    const currentTime = new Date(); // Waktu saat ini

    try {
        const updatedStatus = await pool.query(
            'UPDATE "Status" SET "StatusName" = $1, "EditTime" = $2 WHERE "StatusID" = $3 RETURNING *',
            [StatusName, currentTime, id]
        );
        res.json(updatedStatus.rows[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menghapus status
const deleteStatus = async (req, res) => {
    const id = req.params.id;
    try {
        await pool.query('DELETE FROM "Status" WHERE "StatusID" = $1', [id]);
        res.json({ message: 'Status deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getStatuses,
    getStatusById,
    createStatus,
    updateStatus,
    deleteStatus
};
