const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "PlayBooks", // use your desired DB name
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas (PlayBooks)"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

module.exports = mongoose;
