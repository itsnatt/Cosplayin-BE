// controllers/review.controller.js
const pool = require('../../middleware/db');

// Menampilkan semua review
const getReviews = async (req, res) => {
    try {
        const reviews = await pool.query('SELECT * FROM "Review"');
        res.json(reviews.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menampilkan review berdasarkan ID
const getReviewById = async(req,res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('SELECT * FROM "Review" WHERE "ReviewID" = $1',[id]);
        res.json(response.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menambahkan review baru
const createReview = async (req, res) => {
    const { Text, Rate, ProductID_fk, UserID_fk } = req.body;
    try {
        const newReview = await pool.query(
            'INSERT INTO "Review" ("Text", "Rate", "ProductID_fk", "UserID_fk") VALUES ($1, $2, $3, $4) RETURNING *',
            [Text, Rate, ProductID_fk, UserID_fk]
        );
        res.status(201).json(newReview.rows[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Mengupdate review
const updateReview = async (req, res) => {
    const id = req.params.id;
    const { Text, Rate, ProductID_fk, UserID_fk } = req.body;
    const currentTime = new Date(); // Waktu saat ini

    try {
        const updatedReview = await pool.query(
            'UPDATE "Review" SET "Text" = $1, "Rate" = $2, "ProductID_fk" = $3, "UserID_fk" = $4, "EditTime" = $5 WHERE "ReviewID" = $6 RETURNING *',
            [Text, Rate, ProductID_fk, UserID_fk, currentTime, id]
        );
        res.json(updatedReview.rows[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Menghapus review
const deleteReview = async (req, res) => {
    const id = req.params.id;
    try {
        await pool.query('DELETE FROM "Review" WHERE "ReviewID" = $1', [id]);
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
};
