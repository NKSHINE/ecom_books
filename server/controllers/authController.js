const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    
    req.session.user = { id: user._id, email: user.email };
    res.json({ message: "Signup successful", user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.password !== password) return res.status(401).json({ message: "Incorrect password" });

    req.session.user = { id: user._id, email: user.email };
    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getLoggedInUser = (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
};

exports.googleAuthSuccess = async (req, res) => {
  try {
    const googleUser = req.user;

    let user = await User.findOne({ email: googleUser.email });

    if (!user) {
      user = await User.create({
        full_name: googleUser.name,
        email: googleUser.email,
        googleId: googleUser.googleId,
        role: "user",
        is_premium: false,
      });
    }

    req.session.user = { id: user._id, email: user.email };
    res.redirect("http://localhost:3000/home");
  } catch (err) {
    console.error("Google login error:", err);
    res.status(500).json({ error: "Google authentication failed" });
  }
};
