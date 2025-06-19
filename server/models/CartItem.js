const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  quantity: { type: Number, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model('CartItem', cartItemSchema);
