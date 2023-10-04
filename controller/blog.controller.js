const db = require("../models");
const Blog = db?.Blog;

const express = require("express");
const router = express.Router();

// GET /blogs
router.get("/blogs", async (req, res) => {
  const blogs = await Blog.findAll();
  return res.json({ data: blogs });
});

// GET /blogs/:id
router.get("/blogs/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  return res.json({ data: blog });
});

// POST /blogs
router.post("/blogs", async (req, res) => {
  await Blog.create(req.body);

  return res.json({ message: "Blog created" });
});

// PUT /blogs/:id
router.put("/blogs/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);

  await Blog.update(req.body, { where: { id: blog.id } });

  return res.json({ message: "Blog updated" });
});

// DELETE /blogs/:id
router.delete("/blogs/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);

  await Blog.destroy({ where: { id: blog.id } });

  return res.json({ message: "Blog deleted" });
});

module.exports = router;
