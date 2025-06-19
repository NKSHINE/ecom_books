const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.googleLogin = async (req, res) => {
  const { email, name, googleId } = req.body;

  try {
    if (!email || !name || !googleId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        full_name: name,
        email,
        password: googleId, // optional: use hashed placeholder
        role: 'user',
      });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error("Google login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};