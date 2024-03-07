const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes akan ditambahkan di sini

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// koneksi mongoDB
const mongoose = require('mongoose');

const MONGODB_URI = 'YOUR_MONGODB_URI';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// koneksi ke costumeRoutes
const costumeRoutes = require('./routes/costumeRoutes');
app.use('/api/costumes', costumeRoutes);

