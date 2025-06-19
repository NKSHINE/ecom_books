const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discount_percent: { type: Number, required: true },
  valid_from: { type: Date, required: true },
  valid_to: { type: Date, required: true },
  usage_limit: { type: Number, default: 1 },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema);
