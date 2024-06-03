const pool = require('../../../middleware/db');

const getFilteredProducts = async (req, res) => {
    const { province, district, size, category, title } = req.query;

    let query = `
        SELECT DISTINCT ON (p."ProductID") p.*
        FROM "Product" p
        JOIN "Store" s ON p."StoreID_fk" = s."StoreID"
        JOIN "User" u ON s."UserID_fk" = u."UserID"
        JOIN "Address" a ON u."AddressID_fk" = a."AddressID"
        JOIN "Subdistrict" sd ON a."SubdistrictID_fk" = sd."SubdistrictID"
        JOIN "District" d ON sd."DistrictID_fk" = d."DistrictID"
        JOIN "Province" pr ON d."ProvinceID_fk" = pr."ProvinceID"
        LEFT JOIN "Product_Size" ps ON p."ProductID" = ps."ProductID_fk"
        LEFT JOIN "Size" sz ON ps."SizeID_fk" = sz."SizeID"
        LEFT JOIN "Product_Category" pc ON p."ProductID" = pc."ProductID_fk"
        LEFT JOIN "Category" c ON pc."CategoryID_fk" = c."CategoryID"
        WHERE 1=1
    `;

    const queryParams = [];
    let paramIndex = 1;

    if (province) {
        query += ` AND pr."Province" = $${paramIndex++}`;
        queryParams.push(province);
    }

    if (district) {
        query += ` AND d."District" = $${paramIndex++}`;
        queryParams.push(district);
    }

    if (size) {
        query += ` AND sz."Size" = $${paramIndex++}`;
        queryParams.push(size);
    }

    if (category) {
        query += ` AND c."Category" = $${paramIndex++}`;
        queryParams.push(category);
    }

    if (title) {
        query += ` AND p."Title" ILIKE $${paramIndex++}`;
        queryParams.push(`%${title}%`);
    }

    try {
        const result = await pool.query(query, queryParams);
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = {
    getFilteredProducts,
};
