const mongoose = require('mongoose');

const subdistrictSchema = new mongoose.Schema({
  SubdistrictID: { type: Number, required: true, unique: true },
  Subdistrict: { type: String, required: true },
  DistrictID_fk: { type: Number, required: true },
  CreateTime: { type: Date, required: true },
  EditTime: { type: Date }
});

module.exports = mongoose.model('Subdistrict', subdistrictSchema);
