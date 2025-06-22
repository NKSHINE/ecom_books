// controllers/adminController.js
const User = require('../models/User');
const Order = require('../models/Order');
const Book = require('../models/Book');

exports.getDashboardStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const premiumUsers = await User.countDocuments({ is_premium: true });
    const totalOrders = await Order.countDocuments();
    
    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, o) => sum + o.total_price, 0);

    const lowStockBooks = await Book.find({ stock: { $lte: 5 } }).select("title stock");

    const genreCounts = await Book.aggregate([
      { $group: { _id: "$genre", count: { $sum: 1 } } }
    ]);

    res.json({
      userCount,
      premiumUsers,
      totalOrders,
      totalRevenue,
      lowStockBooks,
      genreCounts
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

