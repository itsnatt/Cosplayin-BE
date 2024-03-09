const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  StoreID: { type: Number, required: true, unique: true },
  StoreName: { type: String, required: true },
  Instagram: String,
  WhatsApp: { type: String, required: true },
  Description: String,
  StatusID_fk: { type: Number, required: true },
  UserID_fk: { type: Number, required: true },
  AddressID_fk: { type: Number, required: true },
  CreateTime: { type: Date, required: true },
  EditTime: { type: Date }
});

module.exports = mongoose.model('Store', storeSchema);
