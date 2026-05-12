const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to db:",mongoose.connection.name)
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error.message);
    console.error("❌ DB connection failed:", err);
    cosole.log("there is some error in mongoose connection")
    process.exit(1);
  }
};

module.exports = connectDB;
