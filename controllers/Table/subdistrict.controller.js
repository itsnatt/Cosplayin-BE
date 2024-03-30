// controllers/subdistrict.controller.js
const pool = require('../../middleware/db');

// Menampilkan semua subdistrik
const getSubdistricts = async (req, res) => {
    try {
        const subdistricts = await pool.query('SELECT * FROM "Subdistrict"');
        res.json(subdistricts.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menambahkan subdistrik baru
const createSubdistrict = async (req, res) => {
    const { SubdistrictID, Subdistrict, DistrictID_fk } = req.body;
    const currentTime = new Date(); // Waktu saat ini

    try {
        const newSubdistrict = await pool.query(
            'INSERT INTO "Subdistrict" ("SubdistrictID", "Subdistrict", "DistrictID_fk", "CreateTime") VALUES ($1, $2, $3, $4) RETURNING *',
            [SubdistrictID, Subdistrict, DistrictID_fk, currentTime]
        );
        res.status(201).json(newSubdistrict.rows[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
// Mengupdate subdistrik
const updateSubdistrict = async (req, res) => {
    const { SubdistrictID } = req.params;
    const { Subdistrict, DistrictID_fk, EditTime } = req.body;
    const currentTime = new Date(); // Waktu saat ini
    try {
        const updatedSubdistrict = await pool.query(
            'UPDATE "Subdistrict" SET "Subdistrict" = $1, "DistrictID_fk" = $2, "EditTime" = $3 WHERE "SubdistrictID" = $4 RETURNING *',
            [Subdistrict, DistrictID_fk, currentTime, SubdistrictID]
        );
        res.json(updatedSubdistrict.rows[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menghapus subdistrik
const deleteSubdistrict = async (req, res) => {
    const { SubdistrictID } = req.params;
    try {
        await pool.query('DELETE FROM "Subdistrict" WHERE "SubdistrictID" = $1', [SubdistrictID]);
        res.json({ message: 'Subdistrict deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getSubdistricts,
    createSubdistrict,
    updateSubdistrict,
    deleteSubdistrict
};
