const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5021;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Koneksi ke MongoDB
const MONGODB_USERNAME = 'asep';
const MONGODB_PASSWORD = 'stroberi';
const MONGODB_HOST = 'node-fr-02.stegripe.org';
const MONGODB_PORT = '4015';
const MONGODB_DATABASE = 'cospl2';

const MONGODB_URI = `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}?authSource=admin&authMechanism=SCRAM-SHA-256`;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB terhubung');
  
  // Tambahkan rute setelah koneksi berhasil
  const provinceRoutes = require('./routes/provinceRoutes');
  app.use('/api/provinces', provinceRoutes);

  // Mulai server setelah koneksi berhasil
  app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
  });
})
.catch(err => console.log(err));

// Koneksi ke MongoDB
//onst MONGODB_URI = 'mongodb://anis:banjir@node-fr-02.stegripe.org:4015/cospl';

