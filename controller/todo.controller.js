const db = require("../models");
const Todo = db?.Todo;

const express = require("express");
const router = express.Router();

// GET /todos
router.get("/todos", async (req, res) => {
  const todos = await Todo.findAll();
  return res.json({ data: todos });
});

// GET /todos/:id
router.get("/todos/:id", async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  return res.json({ data: todo });
});

// POST /todos
router.post("/todos", async (req, res) => {
  await Todo.create(req.body);

  return res.json({ message: "Todo created" });
});

// PUT /todos/:id
router.put("/todos/:id", async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);

  await Todo.update(req.body, { where: { id: todo.id } });

  return res.json({ message: "Todo updated" });
});

// DELETE /todos/:id
router.delete("/todos/:id", async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);

  await Todo.destroy({ where: { id: todo.id } });

  return res.json({ message: "Todo deleted" });
});

module.exports = router;
