const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  ReviewID: { type: Number, required: true, unique: true },
  Text: { type: String, required: true },
  Rate: { type: Number, required: true },
  ProductID_fk: { type: Number, required: true },
  UserID_fk: { type: Number, required: true },
  CreateTime: { type: Date, required: true },
  EditTime: { type: Date }
});

module.exports = mongoose.model('Review', reviewSchema);
