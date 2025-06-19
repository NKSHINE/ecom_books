const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");

router.post("/", wishlistController.addToWishlist);
router.get("/", wishlistController.viewWishlist);
router.delete("/:id", wishlistController.removeFromWishlist);

module.exports = router;
