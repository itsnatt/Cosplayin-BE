const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Import middleware functions



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
app.use(require('./routes//Table/product'));
app.use(require('./routes//Table/favorite'));
app.use(require('./routes//Table/review'));
//funs
app.use(require('./routes//Funs/searchRoutes'));

// Server listening
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
