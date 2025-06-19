// controllers/wishlistController.js
const Wishlist = require('../models/Wishlist');

exports.addToWishlist = async (req, res) => {
  try {
    const item = await Wishlist.create(req.body);
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.viewWishlist = async (req, res) => {
  try {
    const items = await Wishlist.find({ user_id: req.query.user_id }).populate('book_id');
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