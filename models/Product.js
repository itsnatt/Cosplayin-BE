const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  ProductID: { type: Number, required: true, unique: true },
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  unit: String,
  Price: { type: Number, required: true },
  StatusID_fk: { type: Number, required: true },
  Stock: { type: Number, required: true },
  Size1: String,
  Size2: String,
  Size3: String,
  Photo1: String,
  Photo2: String,
  Photo3: String,
  CategoryID_fk: { type: Number, required: true },
  StoreID_fk: { type: Number, required: true },
  CreateTime: { type: Date, required: true },
  EditTime: { type: Date },
  click: { type: Number }
});

module.exports = mongoose.model('Product', productSchema);
