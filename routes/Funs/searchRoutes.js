// routes/searchRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../../middleware/db');

// Search products with multiple filters
router.get('/productfilter', async (req, res) => {
    const { province, district, category, size, title } = req.query;
    try {
        let query = `
            SELECT "Product".*
            FROM "Product"
            JOIN "Store" ON "Product"."StoreID_fk" = "Store"."StoreID"
            JOIN "Address" ON "Store"."AddressID_fk" = "Address"."AddressID"
            JOIN "Subdistrict" ON "Address"."SubdistrictID_fk" = "Subdistrict"."SubdistrictID"
            JOIN "District" ON "Subdistrict"."DistrictID_fk" = "District"."DistrictID"
            JOIN "Province" ON "District"."ProvinceID_fk" = "Province"."ProvinceID"
            JOIN "Category" ON "Product"."CategoryID_fk" = "Category"."CategoryID"
            WHERE 1 = 1`; // Initial query

        const params = []; // Array to store query parameters dynamically

        // Append filter conditions based on provided query parameters
        if (province) {
            query += ` AND "Province"."Province" = $${params.length + 1}`;
            params.push(province);
        }
        if (district) {
            query += ` AND "District"."District" = $${params.length + 1}`;
            params.push(district);
        }
        if (category) {
            query += ` AND "Category"."Category" = $${params.length + 1}`;
            params.push(category);
        }
        if (size) {
            query += ` AND ("Product"."Size1" = $${params.length + 1} OR "Product"."Size2" = $${params.length + 1} OR "Product"."Size3" = $${params.length + 1})`;
            params.push(size);
        }
        if (title) {
            query += ` AND "Product"."Title" LIKE '%' || $${params.length + 1} || '%'`;
            params.push(title);
        }

        const products = await pool.query(query, params);
        res.json(products.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
