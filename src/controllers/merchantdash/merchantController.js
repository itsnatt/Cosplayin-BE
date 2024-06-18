const pool = require('../../middleware/db');

const getMerchant = async (req, res) => {
    const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM "Store" WHERE "UserID_fk" = $1', [id]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMerchant = async (req, res) => {
    const id = req.params.id;
    const { StoreName, Instagram, WhatsApp, Description } = req.body;
    const currentTime = new Date(); // Waktu saat ini
    try {
        const result = await pool.query(
            'UPDATE "Store" SET "StoreName" = $1, "Instagram" = $2, "WhatsApp" = $3, "Description" = $4,"EditTime" = $5 WHERE "UserID_fk" = $6 RETURNING *',
            [StoreName, Instagram, WhatsApp, Description, currentTime, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Store not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




module.exports = {
    getMerchant,
    updateMerchant
};
