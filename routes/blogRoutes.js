const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const{
    createBlog,
    updateBlog,
    getBlogs,
    getBlogById,
    getAdminBlogs,
    deleteBlog,
    getPublishedBlogs
} = require("../controllers/blogController");

router.get("/admin/all", protect, getAdminBlogs);
router.post("/", protect, upload.single("image"), createBlog);
router.put("/:id", protect, upload.single("image"), updateBlog);
router.get("/published", getPublishedBlogs);
router.get("/:id", getBlogById);
router.get("/", getBlogs);
router.delete("/:id", protect, deleteBlog);

module.exports = router;