const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  RoleID: { type: Number, required: true, unique: true },
  RoleName: { type: String, required: true },
  CreateTime: { type: Date, required: true },
  EditTime: { type: Date }
});

module.exports = mongoose.model('Role', roleSchema);
