const express = require("express");
const router = express.Router();
const db = require("../models");
const Blog = db?.Blog;

// Middleware untuk menangani kesalahan
const handleErrors = (res, error) => {
  console.error(error);
  res.status(500).json({ error: "Internal Server Error" });
};

// GET /blogs
router.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    return res.json({ data: blogs });
  } catch (error) {
    handleErrors(res, error);
  }
});

// GET /blogs/:id
router.get("/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    return res.json({ data: blog });
  } catch (error) {
    handleErrors(res, error);
  }
});

// POST /blogs
router.post("/blogs", async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    return res.status(201).json({ message: "Blog created", data: newBlog });
  } catch (error) {
    handleErrors(res, error);
  }
});

// PUT /blogs/:id
router.put("/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    await Blog.update(req.body, { where: { id: blog.id } });
    return res.json({ message: "Blog updated" });
  } catch (error) {
    handleErrors(res, error);
  }
});

// DELETE /blogs/:id
router.delete("/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    await Blog.destroy({ where: { id: blog.id } });
    return res.json({ message: "Blog deleted" });
  } catch (error) {
    handleErrors(res, error);
  }
});

module.exports = router;
