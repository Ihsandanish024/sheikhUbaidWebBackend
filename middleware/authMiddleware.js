// const jwt = require("jsonwebtoken");

// const protect = (req, res, next) => {
//   let token = req.headers.authorization;

//   if (!token || !token.startsWith("Bearer")) {
//     return res.status(401).json({ message: "Not authorized" });
//   }

//   try {
//     token = token.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.admin = decoded.id;
//     const token = jwt.sign(
//   { id: user._id },
//   process.env.JWT_SECRET
// );

// console.log(token);
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = protect;

const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer")) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  try {
    token = token.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.admin = decoded.id;

    next();

  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = protect;