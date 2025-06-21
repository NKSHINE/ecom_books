// config/passport.js
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_REDIRECT_URI
}, async (accessToken, refreshToken, profile, done) => {
  // Save or update user here
  const user = {
    googleId: profile.id,
    email: profile.emails[0].value,
    name: profile.displayName,
  };
  // e.g., User.findOrCreate(user)
  return done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});
