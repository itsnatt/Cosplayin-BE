const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  CategoryID: { type: Number, required: true, unique: true },
  Category: { type: String, required: true },
  CreateTime: { type: Date, required: true },
  EditTime: { type: Date }
});

module.exports = mongoose.model('Category', categorySchema);
