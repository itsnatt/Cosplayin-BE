// controllers/district.controller.js
const pool = require('../../middleware/db');

// Menampilkan semua distrik
const getDistricts = async (req, res) => {
    try {
        const districts = await pool.query('SELECT * FROM "District"');
        res.json(districts.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menambahkan distrik baru
const createDistrict = async (req, res) => {
    const { DistrictID, District, ProvinceID_fk, CreateTime, EditTime } = req.body;
    try {
        const newDistrict = await pool.query(
            'INSERT INTO "District" ("DistrictID", "District", "ProvinceID_fk", "CreateTime", "EditTime") VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [DistrictID, District, ProvinceID_fk, CreateTime, EditTime]
        );
        res.status(201).json(newDistrict.rows[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Mengupdate distrik
const updateDistrict = async (req, res) => {
    const { DistrictID } = req.params;
    const { District, ProvinceID_fk, EditTime } = req.body;
    try {
        const updatedDistrict = await pool.query(
            'UPDATE "District" SET "District" = $1, "ProvinceID_fk" = $2, "EditTime" = $3 WHERE "DistrictID" = $4 RETURNING *',
            [District, ProvinceID_fk, EditTime, DistrictID]
        );
        res.json(updatedDistrict.rows[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menghapus distrik
const deleteDistrict = async (req, res) => {
    const { DistrictID } = req.params;
    try {
        await pool.query('DELETE FROM "District" WHERE "DistrictID" = $1', [DistrictID]);
        res.json({ message: 'District deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getDistricts,
    createDistrict,
    updateDistrict,
    deleteDistrict
};
