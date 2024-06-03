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

const getProductDetails = async (req, res) => {
    const id = req.params.id;

    const query = `
        SELECT 
            p."ProductID",
            p."Title",
            p."Description",
            p."Unit",
            p."Price",
            st."StatusName" AS "Status",
            p."Stock",
            s."StoreID",
            d."District",
            pr."Province",
            s."StoreName",
            s."Instagram",
            s."WhatsApp",
            p."CreateTime",
            p."Click",
            ARRAY_AGG(DISTINCT c."Category") AS "Categories",
            ARRAY_AGG(DISTINCT sz."Size") AS "Sizes",
            ARRAY_AGG(DISTINCT pp."Photo") AS "Photos"
        FROM "Product" p
        JOIN "Status" st ON p."StatusID_fk" = st."StatusID"
        JOIN "Store" s ON p."StoreID_fk" = s."StoreID"
        JOIN "Address" a ON s."AddressID_fk" = a."AddressID"
        JOIN "Subdistrict" sd ON a."SubdistrictID_fk" = sd."SubdistrictID"
        JOIN "District" d ON sd."DistrictID_fk" = d."DistrictID"
        JOIN "Province" pr ON d."ProvinceID_fk" = pr."ProvinceID"
        LEFT JOIN "Product_Category" pc ON p."ProductID" = pc."ProductID_fk"
        LEFT JOIN "Category" c ON pc."CategoryID_fk" = c."CategoryID"
        LEFT JOIN "Product_Size" ps ON p."ProductID" = ps."ProductID_fk"
        LEFT JOIN "Size" sz ON ps."SizeID_fk" = sz."SizeID"
        LEFT JOIN "Product_Photo" pp ON p."ProductID" = pp."ProductID_fk"
        WHERE p."ProductID" = $1
        GROUP BY 
            p."ProductID", 
            p."Title", 
            p."Description", 
            p."Unit", 
            p."Price", 
            st."StatusName", 
            p."Stock", 
            s."StoreID", 
            d."District", 
            pr."Province", 
            s."StoreName", 
            s."Instagram", 
            s."WhatsApp", 
            p."CreateTime", 
            p."Click"
    `;

    try {
        const result = await pool.query(query, [id]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = {
    getFilteredProducts,getProductDetails,
};
