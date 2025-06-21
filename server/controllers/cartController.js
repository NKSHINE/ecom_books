// controllers/cartController.js
const CartItem = require('../models/CartItem');

exports.addToCart = async (req, res) => {
  if (!req.session.user) return res.status(401).json({ message: "Unauthorized" });

  const { book_id, quantity } = req.body;
  const user_id = req.session.user.id;

  const cartItem = new CartItem({ user_id, book_id, quantity });
  await cartItem.save();
  res.json({ message: "Added to cart" });
};


exports.viewCart = async (req, res) => {
  try {
    const userId = req.session.user.id;

    const cartItems = await CartItem.find({ user_id: userId })
      .populate("book_id"); // populate the full book object

    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart items" });
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
