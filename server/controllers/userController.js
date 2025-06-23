// controllers/userController.js
const User = require("../models/User");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude passwords
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Update user by ID
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { full_name, email, is_premium, role, status } = req.body;

  try {
    const updated = await User.findByIdAndUpdate(
      id,
      { full_name, email, is_premium, role, status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "User not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};
