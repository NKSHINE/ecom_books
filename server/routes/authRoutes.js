const express = require("express");
const router = express.Router();
const passport = require("passport");

const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/user", authController.getLoggedInUser);
router.get("/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account" 
  })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/login-failed",
    session: true,
  }),
  authController.googleAuthSuccess
);


module.exports = router;
