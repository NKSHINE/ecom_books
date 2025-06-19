// controllers/reviewController.js
const Review = require('../models/Review');

exports.addReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBookReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ book_id: req.params.bookId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
