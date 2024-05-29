// controllers/province.controller.js
const pool = require('../../middleware/db');

// Menampilkan semua provinsi
const getProvinces = async (req, res) => {
    try {
        const provinces = await pool.query('SELECT * FROM "User"');
        res.json(provinces.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const getProvincesById = async(req,res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM "Province" WHERE "ProvinceID" = $1',[id]);
    res.json(response.rows);
};

// Menambahkan provinsi baru
const createProvince = async (req, res) => {
    const { Province } = req.body;
    const currentTime = new Date(); 
    // Waktu saat ini

    try {
        const newProvince = await pool.query(
            'INSERT INTO "Province" ("Province", "CreateTime", "EditTime") VALUES ($1, $2, $3) RETURNING *',
            [Province, currentTime, currentTime]
        );
        res.status(201).json(newProvince.rows[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'createProvince - Internal Server Error' });
    }
};

// Mengupdate provinsi
const updateProvince = async (req, res) => {
    const id = req.params.id;
    const { Province } = req.body;
    const currentTime = new Date(); // Waktu saat ini
    console.log('updateProvince is running...' + Province + ' '+ currentTime + ' ' +  id);

    try {
        const updatedProvince = await pool.query(
            'UPDATE "Province" SET "Province" = $1, "EditTime" = $2 WHERE "ProvinceID" = $3 RETURNING *',
            [Province, currentTime, id]
        );
        res.json(updatedProvince.rows[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'updateProvince - Internal Server Error' });
    }
};

// Menghapus provinsi
const deleteProvince = async (req, res) => {
    const id = req.params.id;
    try {
        await pool.query('DELETE FROM "Province" WHERE "ProvinceID" = $1', [id]);
        res.json({ message: 'Province deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'deleteProvince - Internal Server Error' });
    }
};







module.exports = {
    getProvinces,
    getProvincesById,
    createProvince,
    updateProvince,
    deleteProvince
};
