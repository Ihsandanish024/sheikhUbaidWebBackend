const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

// This hashes the password AUTOMATICALLY when using .save() or .create()
// This runs AUTOMATICALLY before any .save() command
userSchema.pre("save", async function () {
  // 1. Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return;

  try {
    // 2. Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
    // Notice: No next() call is needed here because it's an async function!
  } catch (error) {
    // If there is an error, we throw it so Mongoose catches it
    throw error;
  }
});

module.exports = mongoose.model("User", userSchema);