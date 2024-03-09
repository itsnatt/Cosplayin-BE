const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  FavoriteID: { type: Number, required: true, unique: true },
  ProductID_fk: { type: Number, required: true },
  UserID_fk: { type: Number, required: true }
});

module.exports = mongoose.model('Favorite', favoriteSchema);
