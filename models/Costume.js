// models/Costume.js
const mongoose = require('mongoose');

const costumeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  
});

module.exports = mongoose.model('Costume', costumeSchema);
