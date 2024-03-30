
// index.js

const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/auth', require('./routes/auth')); // Rute untuk autentikasi
app.use('/api', require('./routes/index')); // Rute yang dilindungi oleh autentikasi
app.use(require('./routes/user'));
app.use(require('./routes//Table/province'));
app.use(require('./routes//Table/distritct'));
app.use(require('./routes//Table/Subdistrict'));



app.listen(process.env.PORT || 4000, () => {
    console.log('Server is running...');
});


