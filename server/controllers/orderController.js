const Order = require("../models/Order");
const Book = require("../models/Book");
const User = require("../models/User");
const CartItem = require('../models/CartItem');

const mongoose = require("mongoose");

const sendOrderConfirmation = require("../utils/sendMail");


exports.createOrder = async (req, res) => {
  try {
    if (!req.session.user) return res.status(401).json({ message: "Unauthorized" });

    const user_id = req.session.user.id;
    const { items, total_price, shipping_address, payment_method } = req.body;

    // Validate book IDs
    const validItems = items.map((item) => {
      if (!mongoose.isValidObjectId(item.book_id)) {
        throw new Error(`Invalid book_id: ${item.book_id}`);
      }
      return {
        book_id: new mongoose.Types.ObjectId(item.book_id),
        quantity: item.quantity,
      };
    });

    const order = new Order({
      user_id,
      items: validItems,
      total_price,
      shipping_address,
      payment_method,
    });

    await order.save();
    await order.populate("items.book_id");
     await CartItem.deleteMany({ user_id });
    const user = await User.findById(user_id);
    await sendOrderConfirmation(user.email, order);
    
    res.json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("Order error:", err.message);
    res.status(400).json({ error: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const orders = await Order.find({ user_id: userId }).populate("items.book_id");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("items.book_id");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
