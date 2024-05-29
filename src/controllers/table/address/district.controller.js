// controllers/district.controller.js
const pool = require('../../../middleware/db');

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

// Menampilkan distrik berdasarkan ID
const getDistrictById = async(req,res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('SELECT * FROM "District" WHERE "DistrictID" = $1',[id]);
        res.json(response.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menambahkan distrik baru
const createDistrict = async (req, res) => {
    const { District, ProvinceID_fk } = req.body;
    try {
        const newDistrict = await pool.query(
            'INSERT INTO "District" ("District", "ProvinceID_fk") VALUES ($1, $2) RETURNING *',
            [District, ProvinceID_fk]
        );
        res.status(201).json(newDistrict.rows[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Mengupdate distrik
const updateDistrict = async (req, res) => {
    const id = req.params.id;
    const { District, ProvinceID_fk } = req.body;
    const currentTime = new Date(); // Waktu saat ini

    try {
        const updatedDistrict = await pool.query(
            'UPDATE "District" SET "District" = $1, "ProvinceID_fk" = $2, "EditTime" = $3 WHERE "DistrictID" = $4 RETURNING *',
            [District, ProvinceID_fk,currentTime, id]
        );
        res.json(updatedDistrict.rows[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menghapus distrik
const deleteDistrict = async (req, res) => {
    const id = req.params.id;
    try {
        await pool.query('DELETE FROM "District" WHERE "DistrictID" = $1', [id]);
        res.json({ message: 'District deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getDistricts,
    getDistrictById,
    createDistrict,
    updateDistrict,
    deleteDistrict
};
