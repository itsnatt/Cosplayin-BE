const pool = require('../../middleware/db');

// Membuat produk baru
const createProduct = async (req, res) => {
    const { title, description, unit, price, statusID, stock, userID, categories, sizes, images } = req.body;
    try {
        const storeResult = await pool.query('SELECT "StoreID" FROM "Store" WHERE "UserID_fk" = $1', [userID]);
        const storeID = storeResult.rows[0].StoreID;
        const productResult = await pool.query(
            'INSERT INTO "Product" ("Title", "Description", "Unit", "Price", "StatusID_fk", "Stock", "StoreID_fk") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "ProductID"',
            [title, description, unit, price, statusID, stock, storeID]
        );

        const productID = productResult.rows[0].ProductID;

        for (let categoryID of categories) {
            await pool.query('INSERT INTO "Product_Category" ("ProductID_fk", "CategoryID_fk") VALUES ($1, $2)', [productID, categoryID]);
        }

        for (let sizeID of sizes) {
            await pool.query('INSERT INTO "Product_Size" ("ProductID_fk", "SizeID_fk") VALUES ($1, $2)', [productID, sizeID]);
        }

        for (let image of images) {
            await pool.query('INSERT INTO "Product_Photo" ("ProductID_fk", "Photo") VALUES ($1, $2)', [productID, image]);
        }

        res.status(201).send('Product created successfully');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mengupdate produk yang ada
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title, description, unit, price, statusID, stock, categories, sizes, images } = req.body;
    const currentTime = new Date();
    try {
        const productResult = await pool.query(
            'UPDATE "Product" SET "Title" = $1, "Description" = $2, "Unit" = $3, "Price" = $4, "StatusID_fk" = $5, "Stock" = $6, "EditTime" = $7 WHERE "ProductID" = $8 RETURNING *',
            [title, description, unit, price, statusID, stock, currentTime, id]
        );

        if (productResult.rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await pool.query('DELETE FROM "Product_Category" WHERE "ProductID_fk" = $1', [id]);
        await pool.query('DELETE FROM "Product_Size" WHERE "ProductID_fk" = $1', [id]);
        await pool.query('DELETE FROM "Product_Photo" WHERE "ProductID_fk" = $1', [id]);

        for (let categoryID of categories) {
            await pool.query('INSERT INTO "Product_Category" ("ProductID_fk", "CategoryID_fk") VALUES ($1, $2)', [id, categoryID]);
        }

        for (let sizeID of sizes) {
            await pool.query('INSERT INTO "Product_Size" ("ProductID_fk", "SizeID_fk") VALUES ($1, $2)', [id, sizeID]);
        }

        for (let image of images) {
            await pool.query('INSERT INTO "Product_Photo" ("ProductID_fk", "Photo") VALUES ($1, $2)', [id, image]);
        }

        res.status(200).json(productResult.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Menghapus produk
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const { userID } = req.body;
    try {
        const productResult = await pool.query('SELECT "StoreID_fk" FROM "Product" WHERE "ProductID" = $1', [id]);

        if (productResult.rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const storeID = productResult.rows[0].StoreID_fk;
        const storeResult = await pool.query('SELECT "UserID_fk" FROM "Store" WHERE "StoreID" = $1', [storeID]);

        if (storeResult.rows.length === 0 || storeResult.rows[0].UserID_fk !== userID) {
            return res.status(403).json({ message: 'Not authorized to delete this product' });
        }

        await pool.query('DELETE FROM "Product" WHERE "ProductID" = $1', [id]);
        await pool.query('DELETE FROM "Product_Category" WHERE "ProductID_fk" = $1', [id]);
        await pool.query('DELETE FROM "Product_Size" WHERE "ProductID_fk" = $1', [id]);
        await pool.query('DELETE FROM "Product_Photo" WHERE "ProductID_fk" = $1', [id]);

        res.status(200).send('Product deleted successfully');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Menampilkan daftar produk berdasarkan userId
const listProducts = async (req, res) => {
    const { userId } = req.params;
    try {
        console.log('Fetching store for user:', userId); // Log tambahan
        const storeResult = await pool.query('SELECT "StoreID" FROM "Store" WHERE "UserID_fk" = $1', [userId]);
        
        console.log('Store query result:', storeResult.rows); // Log tambahan

        if (storeResult.rows.length === 0) {
            return res.status(404).json({ message: 'Store not found for this user' });
        }

        const storeID = storeResult.rows[0].StoreID;
        console.log('Store ID:', storeID); // Log tambahan

        const productsResult = await pool.query('SELECT * FROM "Product" WHERE "StoreID_fk" = $1', [storeID]);
        
        const products = productsResult.rows;
        console.log('Products fetched:', products); // Log tambahan

        for (let product of products) {
            const categoriesResult = await pool.query('SELECT "CategoryID_fk" FROM "Product_Category" WHERE "ProductID_fk" = $1', [product.ProductID]);
            const sizesResult = await pool.query('SELECT "SizeID_fk" FROM "Product_Size" WHERE "ProductID_fk" = $1', [product.ProductID]);
            const photosResult = await pool.query('SELECT "Photo" FROM "Product_Photo" WHERE "ProductID_fk" = $1', [product.ProductID]);
            
            product.categories = categoriesResult.rows.map(row => row.CategoryID_fk);
            product.sizes = sizesResult.rows.map(row => row.SizeID_fk);
            product.photos = photosResult.rows.map(row => row.Photo);
        }

        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error); // Log tambahan
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    listProducts,
};
