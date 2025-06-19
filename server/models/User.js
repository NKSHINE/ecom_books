// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  full_name: String,
  email: { type: String, required: true, unique: true },
  password: String, // Optional for Google users
  googleId: String, // Optional for email/password users
  is_premium: { type: Boolean, default: false },
  role: { type: String, default: 'user' },
  status: { type: String, default: 'active' }
}, { timestamps: true });
const UserModel = mongoose.model("User", UserSchema); // Collection: users
module.exports = UserModel;
