const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  UserID: { type: Number, required: true, unique: true },
  FullName: { type: String, required: true },
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  RoleID_fk: { type: Number, required: true },
  AddressID_fk: { type: Number, required: true },
  CreateTime: { type: Date, required: true },
  EditTime: { type: Date }
});

module.exports = mongoose.model('User', userSchema);
