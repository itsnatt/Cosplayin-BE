const pool = require('../../../middleware/db');

// Menampilkan semua ukuran
const getSizes = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Size"');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Menampilkan ukuran berdasarkan ID
const getSizeById = async (req, res) => {
    const  SizeID  = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM "Size" WHERE "SizeID" = $1', [SizeID]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Size not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Menambahkan ukuran baru
const addSize = async (req, res) => {
    const { Size } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO "Size" ("Size") VALUES ($1) RETURNING *',
            [Size]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Mengupdate ukuran
const updateSize = async (req, res) => {
    const { SizeID } = req.params;
    const { Size } = req.body;
    try {
        const result = await pool.query(
            'UPDATE "Size" SET "Size" = $1, "EditTime" = CURRENT_TIMESTAMP WHERE "SizeID" = $2 RETURNING *',
            [Size, SizeID]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Size not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Menghapus ukuran
const deleteSize = async (req, res) => {
    const { SizeID } = req.params;
    try {
        const result = await pool.query(
            'DELETE FROM "Size" WHERE "SizeID" = $1 RETURNING *',
            [SizeID]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Size not found' });
        }
        res.status(200).json({ message: 'Size deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getSizes,
    getSizeById,
    addSize,
    updateSize,
    deleteSize,
};
