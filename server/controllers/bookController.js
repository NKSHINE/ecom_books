// controllers/bookController.js
const Book = require('../models/Book');
const CartItem = require("../models/CartItem");
const Wishlist = require("../models/Wishlist");
const Order = require("../models/Order");

exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch book' });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



// Do NOT delete orders, just handle them when viewing

exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    const book = await Book.findByIdAndDelete(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // 🧹 Remove from cart
    await CartItem.deleteMany({ book_id: bookId });

    // 🧹 Remove from wishlist
    await Wishlist.deleteMany({ book_id: bookId });
    


    // ❗ Do NOT delete from Order.items (keep order history intact)

    res.json({ message: 'Book and related cart/wishlist items deleted successfully' });
  } catch (err) {
    console.error("Book deletion error:", err);
    res.status(500).json({ error: 'Failed to delete book' });
  }
};


exports.listBooks = async (req, res) => {
  try {
    const { genre, author, publisher, minPrice, maxPrice } = req.query;
    const filter = {};

    if (genre) filter.genre = genre;
    if (author) filter.author = author;
    if (publisher) filter.publisher = publisher;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const books = await Book.find(filter);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
