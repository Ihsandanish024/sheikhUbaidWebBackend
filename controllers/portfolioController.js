const Portfolio = require("../models/portfolioModel");

// 📌 Get Portfolio (Public)
exports.getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔐 Create or Update Portfolio (Admin Only)
exports.upsertPortfolio = async (req, res) => {
  try {
    const { introduction, education, skills, activities } = req.body;

    let portfolio = await Portfolio.findOne();


 const imagePath = req.file
      ? `/uploads/${req.file.filename}`
      : portfolio?.profileImage;
    

    if (portfolio) {
      portfolio.introduction = introduction;
      portfolio.education = education;
      portfolio.skills = skills;
      portfolio.activities = activities;
      portfolio.profileImage = imagePath
      await portfolio.save();
    } else {
      portfolio = await Portfolio.create({
        introduction,
        education,
        skills,
        activities,
        profileImage:imagePath
      });
    }

    res.json({ message: "Portfolio saved successfully", portfolio });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};