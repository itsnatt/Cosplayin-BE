const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
  DistrictID: { type: Number, required: true, unique: true },
  District: { type: String, required: true },
  ProvinceID_fk: { type: Number, required: true },
  CreateTime: { type: Date, required: true },
  EditTime: { type: Date }
});

module.exports = mongoose.model('District', districtSchema);
