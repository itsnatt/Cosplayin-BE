
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

//simpeld tabel api - kurang auth
app.use(require('./routes//Table/province'));
app.use(require('./routes//Table/distritct'));
app.use(require('./routes//Table/Subdistrict'));
app.use(require('./routes//Table/address'));
app.use(require('./routes//Table/status'));
app.use(require('./routes//Table/role'));
app.use(require('./routes//Table/user'));
app.use(require('./routes//Table/category'));
app.use(require('./routes//Table/store'));
// app.use(require('./routes//Table/store'));
// app.use(require('./routes//Table/store'));
// app.use(require('./routes//Table/store'));




app.listen(process.env.PORT || 4000, () => {
    console.log('Server is running...');
});


