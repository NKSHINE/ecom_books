const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/", cartController.addToCart);
router.get("/", cartController.viewCart);
router.delete("/:id", cartController.removeFromCart);
router.put("/",cartController.updateQuantity);
module.exports = router;
