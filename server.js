// server.js

const express = require('express');
const app = express();
const authMiddleware = require('./middleware/authMiddleware');
const authRoutes = require('./routes/Funs/authRoutes');

const admin = require('firebase-admin');

// Inisialisasi Firebase Admin SDK
const serviceAccount = require('./middleware/serviceAccountKey.json'); // Sesuaikan dengan lokasi file kredensial Anda
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Konfigurasi Firebase Anda
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware untuk CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Mengizinkan akses dari semua origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Metode HTTP yang diizinkan
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Header yang diizinkan
    next();
});

//simpeld tabel api - kurang auth
app.use(require('./routes/Table/province'));
app.use(require('./routes/Table/distritct'));
app.use(require('./routes/Table/Subdistrict'));
app.use(require('./routes/Table/address'));
app.use(require('./routes/Table/status'));
app.use(require('./routes/Table/role'));
app.use(require('./routes/Table/user'));
app.use(require('./routes/Table/category'));
app.use(require('./routes/Table/store'));
app.use(require('./routes/Table/product'));
app.use(require('./routes/Table/favorite'));
app.use(require('./routes/Table/review'));
//funs
app.use(require('./routes/Funs/searchRoutes'));

// Route untuk authentication
app.use('/auth', authRoutes);


// Server listening
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
