
const express = require('express');
const router = require("./routes");
const cookieParser = require('cookie-parser');
const cors = require('cors');
require("dotenv").config();
const PORT = process.env.PORT || 8080;

const pool = require('../src/middleware/db');




const app = express();


pool.connect((err) => {
    if (err) {
      console.error('Koneksi gagal:', err);
      return;
    }
    console.log('Terhubung ke database PostgreSQL!');
  });

app.use(express.json())
app.use(cookieParser())
app.use(cors());
app.use(router)




app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});



