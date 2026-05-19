// const express = require("express");
// const router = express.Router();
// const upload = require("../middleware/uploadMiddleware")
// const protect = require("../middleware/authMiddleware");
// const {
//   getPortfolio,
//   upsertPortfolio,
// } = require("../controllers/portfolioController");
// router.post(
//     "/",
//     protect,
//     upload.single("https://www.shutterstock.com/image-photo/sun-sets-behind-mountain-ranges-600nw-2479236003.jpg"),
//     upsertPortfolio
// )


// // 


// // Public
// router.get("/", getPortfolio);

// // Admin Protected
// router.post("/", protect, upsertPortfolio);

// module.exports = router;