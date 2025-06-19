const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String },
  genre: { type: String },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  language: { type: String },
  publisher: { type: String },
  image: { type: String }, // URL to cover image
  tags: [String],
  is_featured: { type: Boolean, default: false },
  offer: {
    discount_percent: Number,
    valid_till: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
