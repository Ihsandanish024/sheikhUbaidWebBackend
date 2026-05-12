const Blog = require("../models/Blog.js");

// CREATE blog 
 const createBlog = async (req, res) => {
  const {title,content,status} = req.body;
  try {

    const blog = await Blog.create({
      title,
      content,
      status:status||"draft",
    });

    res.status(201).json(blog);
  } catch (error) {
    console.log(error)
    res.status(400).json({ message:error.message })
    console.log("this si an error in create blog");
  }
};



// UPDATE
const updateBlog = async (req, res) => {


try{const {title,content,status} = req.body;

  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
   {title,content,status},
    { new: true }
  );
  res.json(blog);
  
} catch (error){
res.status(500).json({message:"ubdate failed"})
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
    console.log("blog get api is working");
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