const Blog = require("../models/Blog.js");

// CREATE blog 
 const createBlog = async (req, res) => {
  const { title, content, status } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    const blog = await Blog.create({
      title,
      content,
      status: status || "draft",
      image: req.file ? req.file.path : undefined,
    });

    res.status(201).json(blog);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};



// UPDATE
const updateBlog = async (req, res) => {
  try {
    const { title, content, status } = req.body;
    const updateData = {};

    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (status !== undefined) updateData.status = status;
    if (req.file) updateData.image = req.file.path;

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};


// GET all blogs
 const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({status:"published"}).sort({ createdAt: -1 });
    res.json(blogs)
    console.log("get blog api is working");
  } catch (error) {
    console.log("error in getting ")
    res.status(500).json({
     message: error.message 
    });
  }
};

// GET single blog
 const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog)
    console.log("get soigle blog api is not working");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE blog
 const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAdminBlogs = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;

  const skip = (page - 1) * limit;

  try {
    const total = await Blog.countDocuments();
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      blogs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch admin blogs" });
  }
};


const getPublishedBlogs = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 6;
  const skip = (page - 1) * limit;

  try {
    const total = await Blog.countDocuments({ status: "published" });

    const blogs = await Blog.find({ status: "published" })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      blogs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch  blogs" });
  }
};




module.exports = {getBlogs,getPublishedBlogs,updateBlog,getBlogById,deleteBlog,getAdminBlogs,createBlog}