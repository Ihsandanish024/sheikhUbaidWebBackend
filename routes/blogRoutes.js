const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const{
    createBlog,
     updateBlog,
    getBlogs,
    getBlogById,
    getAdminBlogs,
    deleteBlog,
    getPublishedBlogs
} = require("../controllers/blogController");


router.get("/admin/all",protect,getAdminBlogs);
router.post ("/",protect,createBlog);
router.put("/:id",protect, updateBlog);
router.get("/",getBlogs);
router.get("/:id",getBlogById);
router.get("/",getPublishedBlogs)
router.delete("/:id",protect,deleteBlog);

module.exports =  router;