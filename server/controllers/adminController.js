const User = require("../models/User");
const Order = require("../models/Order");
const Book = require("../models/Book");

exports.getAdminStats = async (req, res) => {
  const [userCount, premiumUsers, totalOrders, totalRevenue, genreCounts, lowStockBooks, users] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ is_premium: true }),
    Order.countDocuments(),
    Order.aggregate([{ $group: { _id: null, total: { $sum: "$total_price" } } }]),
    Book.aggregate([{ $group: { _id: "$genre", count: { $sum: 1 } } }]),
    Book.find({ stock: { $lte: 5 } }, "_id title stock"),
    User.find({}, "full_name email address role") // Send users for table
  ]);

  res.json({
    userCount,
    premiumUsers,
    totalOrders,
    totalRevenue: totalRevenue[0]?.total || 0,
    genreCounts,
    lowStockBooks,
    users
  });
};

