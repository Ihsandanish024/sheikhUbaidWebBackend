

const express = require("express");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes")
const blogRoutes = require("./routes/blogRoutes")
// const portfolioRoutes = require("./routes/portfolioRoutes")
require("dotenv").config()
const connectDB = require("./config/db");

const app = express();
app.use("/uploads", express.static("uploads"));

const router = express.Router();

connectDB();
  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use("/api/admin", adminRoutes);

// DB connection

//routes
app.use("/api/blogs",blogRoutes);
app.use("/api/users",userRoutes)
// app.use("/api/portfolio",portfolioRoutes)

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
  
});

app.get('/test', (req, res) => res.send("Server is alive!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
