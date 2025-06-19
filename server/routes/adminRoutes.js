const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/users", adminController.getAllUsers);
router.put("/users/ban/:id", adminController.banUser);
router.put("/users/premium/:id", adminController.upgradeToPremium);
router.get("/dashboard", adminController.getDashboardStats);

module.exports = router;
