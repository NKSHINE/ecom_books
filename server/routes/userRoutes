// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Admin routes for managing users
router.get("/", userController.getAllUsers); // Get all users
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser); // Update user by ID
router.delete("/:id", userController.deleteUser); // Delete user by ID

module.exports = router;
