CREATE TABLE IF NOT EXISTS "Province" (
    "ProvinceID" SERIAL PRIMARY KEY,
    "Province" varchar(50) NOT NULL,
    "CreateTime" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "EditTime" TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "District" (
    "DistrictID" SERIAL PRIMARY KEY,
    "District" varchar(50) NOT NULL,
    "ProvinceID_fk" int NOT NULL,
    "CreateTime" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "EditTime" TIMESTAMP,
    FOREIGN KEY ("ProvinceID_fk") REFERENCES "Province"("ProvinceID")
);

CREATE TABLE IF NOT EXISTS "Subdistrict" (
    "SubdistrictID" SERIAL PRIMARY KEY,
    "Subdistrict" varchar(50) NOT NULL,
    "DistrictID_fk" int NOT NULL,
    "CreateTime" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "EditTime" TIMESTAMP,
    FOREIGN KEY ("DistrictID_fk") REFERENCES "District"("DistrictID")
);

CREATE TABLE IF NOT EXISTS "Address" (
    "AddressID" SERIAL PRIMARY KEY,
    "Address" varchar(50) NOT NULL,
    "Address2" varchar(50),
    "SubdistrictID_fk" int NOT NULL,
    "CreateTime" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "EditTime" TIMESTAMP,
    FOREIGN KEY ("SubdistrictID_fk") REFERENCES "Subdistrict"("SubdistrictID")
);

CREATE TABLE IF NOT EXISTS "Status" (
    "StatusID" SERIAL PRIMARY KEY,
    "StatusName" varchar(50) NOT NULL,
    "CreateTime" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "EditTime" TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "User" (
    "UserID" SERIAL PRIMARY KEY,
    "FullName" varchar(50) NOT NULL,
    "Username" varchar(50) NOT NULL,
    "Password" varchar(50) NOT NULL,
    "Email" varchar(50) NOT NULL,
    "RoleID_fk" int NOT NULL,
    "AddressID_fk" int NOT NULL,
    "CreateTime" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "EditTime" TIMESTAMP,
    FOREIGN KEY ("RoleID_fk") REFERENCES "Role"("RoleID"),
    FOREIGN KEY ("AddressID_fk") REFERENCES "Address"("AddressID")
);

CREATE TABLE IF NOT EXISTS "Review" (
    "ReviewID" SERIAL PRIMARY KEY,
    "Text" text NOT NULL,
    "Rate" int NOT NULL,
    "ProductID_fk" int NOT NULL,
    "UserID_fk" int NOT NULL,
    "CreateTime" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "EditTime" TIMESTAMP,
    FOREIGN KEY ("ProductID_fk") REFERENCES "Product"("ProductID"),
    FOREIGN KEY ("UserID_fk") REFERENCES "User"("UserID")
);

CREATE TABLE IF NOT EXISTS "Role" (
    "RoleID" SERIAL PRIMARY KEY,
    "RoleName" varchar(50) NOT NULL,
    "CreateTime" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "EditTime" TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Favorite" (
    "FavoriteID" SERIAL PRIMARY KEY,
    "ProductID_fk" int NOT NULL,
    "UserID_fk" int NOT NULL,
    FOREIGN KEY ("ProductID_fk") REFERENCES "Product"("ProductID"),
    FOREIGN KEY ("UserID_fk") REFERENCES "User"("UserID")
);

CREATE TABLE IF NOT EXISTS "Store" (
    "StoreID" SERIAL PRIMARY KEY,
    "StoreName" varchar(50) NOT NULL,
    "Instagram" varchar(50),
    "WhatsApp" varchar(50) NOT NULL,
    "Description" varchar(50),
    "StatusID_fk" int NOT NULL,
    "UserID_fk" int NOT NULL,
    "AddressID_fk" int NOT NULL,
    "CreateTime" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "EditTime" TIMESTAMP,
    FOREIGN KEY ("StatusID_fk") REFERENCES "Status"("StatusID"),
    FOREIGN KEY ("UserID_fk") REFERENCES "User"("UserID"),
    FOREIGN KEY ("AddressID_fk") REFERENCES "Address"("AddressID")
);

CREATE TABLE IF NOT EXISTS "Category" (
    "CategoryID" SERIAL PRIMARY KEY,
    "Category" varchar(50) NOT NULL,
    "CreateTime" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "EditTime" TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Product" (
    "ProductID" SERIAL PRIMARY KEY,
    "Title" varchar(50) NOT NULL,
    "Description" text NOT NULL,
    "unit" varchar(5) NOT NULL,
    "Price" numeric NOT NULL,
    "StatusID_fk" int NOT NULL,
    "Stock" int NOT NULL,
    "Size1" varchar(5) NOT NULL,
    "Size2" varchar(5) NOT NULL,
    "Size3" varchar(5) NOT NULL,
    "Photo1" varchar(255) NOT NULL,
    "Photo2" varchar(255) NOT NULL,
    "Photo3" varchar(255) NOT NULL,
    "CategoryID_fk" int NOT NULL,
    "StoreID_fk" int NOT NULL,
    "CreateTime" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "EditTime" TIMESTAMP,
    "click" int NOT NULL DEFAULT '0',
    FOREIGN KEY ("StatusID_fk") REFERENCES "Status"("StatusID"),
    FOREIGN KEY ("CategoryID_fk") REFERENCES "Category"("CategoryID"),
    FOREIGN KEY ("StoreID_fk") REFERENCES "Store"("StoreID")
);



----------------------------------------------
Dummy
_______________________________________________



INSERT INTO "Province" ("Province", "CreateTime") VALUES
('Jawa Barat', CURRENT_TIMESTAMP),
('Jawa Tengah', CURRENT_TIMESTAMP),
('Jawa Timur', CURRENT_TIMESTAMP);

INSERT INTO "District" ("District", "ProvinceID_fk", "CreateTime") VALUES
('Bandung', 1, CURRENT_TIMESTAMP),
('Semarang', 2, CURRENT_TIMESTAMP),
('Surabaya', 3, CURRENT_TIMESTAMP);

INSERT INTO "Subdistrict" ("Subdistrict", "DistrictID_fk", "CreateTime") VALUES
('Lembang', 1, CURRENT_TIMESTAMP),
('Cimahi', 1, CURRENT_TIMESTAMP),
('Candi', 2, CURRENT_TIMESTAMP),
('Gajah Mungkur', 2, CURRENT_TIMESTAMP),
('Kenjeran', 3, CURRENT_TIMESTAMP),
('Sukolilo', 3, CURRENT_TIMESTAMP);

INSERT INTO "Address" ("Address", "SubdistrictID_fk", "CreateTime") VALUES
('Jl. Merdeka No. 10', 1, CURRENT_TIMESTAMP),
('Jl. Pahlawan No. 25', 3, CURRENT_TIMESTAMP),
('Jl. Raya Timur No. 30', 5, CURRENT_TIMESTAMP);


INSERT INTO "Status" ("StatusName", "CreateTime") VALUES
('Active', CURRENT_TIMESTAMP),
('Inactive', CURRENT_TIMESTAMP);


INSERT INTO "Role" ("RoleName", "CreateTime") VALUES
('Admin', CURRENT_TIMESTAMP),
('User', CURRENT_TIMESTAMP);

INSERT INTO "Category" ("Category", "CreateTime") VALUES
('Electronics', CURRENT_TIMESTAMP),
('Clothing', CURRENT_TIMESTAMP),
('Furniture', CURRENT_TIMESTAMP);



INSERT INTO "User" ("FullName", "Username", "Password", "Email", "RoleID_fk", "AddressID_fk", "CreateTime") VALUES
('John Doe', 'johndoe', 'password123', 'john@example.com', 1, 1, CURRENT_TIMESTAMP),
('Jane Smith', 'janesmith', 'password456', 'jane@example.com', 2, 2, CURRENT_TIMESTAMP),
('Michael Johnson', 'michaelj', 'password789', 'michael@example.com', 2, 3, CURRENT_TIMESTAMP);

INSERT INTO "Store" ("StoreName", "Instagram", "WhatsApp", "Description", "StatusID_fk", "UserID_fk", "AddressID_fk", "CreateTime") VALUES
('Gadget World', '@gadgetworld', '+1234567890', 'Your one-stop shop for gadgets', 1, 1, 1, CURRENT_TIMESTAMP),
('Fashion Boutique', '@fashionboutique', '+0987654321', 'Trendy clothing store', 1, 2, 2, CURRENT_TIMESTAMP),
('Furniture Palace', '@furniturepalace', '+9876543210', 'Home furnishing store', 1, 3, 3, CURRENT_TIMESTAMP);


INSERT INTO "Product" ("Title", "Description", "unit", "Price", "StatusID_fk", "Stock", "Size1", "Size2", "Size3", "Photo1", "Photo2", "Photo3", "CategoryID_fk", "StoreID_fk", "CreateTime") VALUES
('Smartphone', 'Latest smartphone model', 'pcs', 1000.00, 1, 50, 'S', 'M', 'L', 'smartphone1.jpg', 'smartphone2.jpg', 'smartphone3.jpg', 1, 1, CURRENT_TIMESTAMP),
('T-shirt', 'Casual cotton t-shirt', 'pcs', 20.00, 1, 100, 'S', 'M', 'L', 'tshirt1.jpg', 'tshirt2.jpg', 'tshirt3.jpg', 2, 2, CURRENT_TIMESTAMP),
('Sofa', 'Comfortable sofa for living room', 'pcs', 500.00, 1, 10, 'S', 'M', 'L', 'sofa1.jpg', 'sofa2.jpg', 'sofa3.jpg', 3, 3, CURRENT_TIMESTAMP);


INSERT INTO "Favorite" ("ProductID_fk", "UserID_fk") VALUES
(4, 1),
(5, 2);

INSERT INTO "Review" ("Text", "Rate", "ProductID_fk", "UserID_fk", "CreateTime") VALUES
('Great product, highly recommended!', 5, 4, 1, CURRENT_TIMESTAMP),
('Good quality and fast delivery', 4, 5, 2, CURRENT_TIMESTAMP),
('Satisfied with the purchase', 4, 6, 3, CURRENT_TIMESTAMP);





