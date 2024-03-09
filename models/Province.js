const mongoose = require('mongoose');

const provinceSchema = new mongoose.Schema({
  ProvinceID: { type: Number, required: true, unique: true },
  Province: { type: String, required: true },
  CreateTime: { type: Date, required: true },
  EditTime: { type: Date }
});

module.exports = mongoose.model('Province', provinceSchema);
