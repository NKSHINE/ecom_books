// controllers/wishlistController.js
const Wishlist = require('../models/Wishlist');

exports.addToWishlist = async (req, res) => {
  try {
    if (!req.session.user) return res.status(401).json({ message: "Unauthorized" });
    const { book_id } = req.body;
    const user_id = req.session.user.id;
    const existing = await Wishlist.findOne({ user_id, book_id });
    if (existing) return res.status(400).json({ message: "Already in wishlist" });
    const item = await Wishlist.create({ user_id, book_id });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



exports.viewWishlist = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const items = await Wishlist.find({ user_id: userId }).populate('book_id');
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);
    res.json({ message: 'Removed from wishlist' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};