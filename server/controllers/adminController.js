// controllers/adminController.js
const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.banUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { status: 'banned' }, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.upgradeToPremium = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { is_premium: true }, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const premiumUsers = await User.countDocuments({ is_premium: true });
    res.json({ userCount, premiumUsers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};