const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

// ✅ IMPORT ROUTES FIRST
const bookRoutes = require("./routes/bookRoutes");

const app = express();

// Connect MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// ✅ USE ROUTES AFTER IMPORT
app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("Library Management Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
