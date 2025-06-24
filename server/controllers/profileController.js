// controllers/userController.js
const User = require('../models/User');

// GET /api/profile
exports.getProfile = async (req, res) => {
  try {
    const sessionUser = req.session.user;

    if (!sessionUser) {
      return res.status(401).json({ message: 'User not logged in' });
    }

    const user = await User.findById(sessionUser.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user._id,
      full_name: user.full_name,
      email: user.email,
      is_premium: user.is_premium,
      role: user.role,
      status: user.status
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// PUT /api/users/profile
exports.updateProfile = async (req, res) => {
  const userId = req.session?.user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const { full_name, email, password } = req.body;

    // Check if email is being changed to one that already exists
    const existingEmailUser = await User.findOne({ email });
    if (existingEmailUser && existingEmailUser._id.toString() !== userId) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const updateData = { full_name, email };

    if (password && password.trim()) {
      updateData.password = password; // 🔓 no hashing — direct update
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
