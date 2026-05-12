const User = require("../controllers/userController");

// @desc   Create new user
// @route  POST /api/users
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("there is some error in database")
  }
};

module.exports = { createUser };
