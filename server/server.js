
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require('bcryptjs');
require('dotenv').config();
dotenv.config();
require("./auth/passport");
const mongoose = require("./db/connection");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const bookRoutes = require("./routes/bookRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const couponRoutes = require("./routes/couponRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require('./routes/profileRoutes');
const passport = require("passport");



const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: "yourSecretKey",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  }
}));

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes); 
app.use("/api/admin", adminRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes);  
app.use("/api/wishlist", wishlistRoutes);
app.use('/api/profile', profileRoutes);



app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("PlayBooks API is running...");
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
