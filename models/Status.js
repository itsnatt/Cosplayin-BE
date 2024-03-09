const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  StatusID: { type: Number, required: true, unique: true },
  StatusName: { type: String, required: true },
  CreateTime: { type: Date, required: true },
  EditTime: { type: Date }
});

module.exports = mongoose.model('Status', statusSchema);
