// controllers/cartController.js
const CartItem = require('../models/CartItem');

exports.addToCart = async (req, res) => {
  try {
    const item = await CartItem.create(req.body);
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.viewCart = async (req, res) => {
  try {
    const items = await CartItem.find({ user_id: req.query.user_id }).populate('book_id');
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Removed from cart' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
