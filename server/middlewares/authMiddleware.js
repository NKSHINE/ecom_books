const User = require("../models/User");

const attachUser = async (req, res, next) => {
  if (req.session.userId) {
    try {
      const user = await User.findById(req.session.userId).select("-password");
      if (user) {
        req.user = user;
      }
    } catch (err) {
      console.error("Failed to attach user:", err);
    }
  }
  next();
};

module.exports = attachUser;
