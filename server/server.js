const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("./db/connection");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("PlayBooks API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
