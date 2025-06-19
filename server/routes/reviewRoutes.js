const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router.post("/", reviewController.addReview);
router.get("/:bookId", reviewController.getBookReviews);
router.delete("/:id", reviewController.deleteReview);

module.exports = router;
