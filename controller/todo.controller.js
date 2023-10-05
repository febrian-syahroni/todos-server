const express = require("express");
const router = express.Router();
const db = require("../models");
const Todo = db?.Todo;

// Middleware untuk menangani kesalahan
const handleErrors = (res, error) => {
  console.error(error);
  res.status(500).json({ error: "Internal Server Error" });
};

// GET /todos
router.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.findAll();
    return res.json({ data: todos });
  } catch (error) {
    handleErrors(res, error);
  }
});

// GET /todos/:id
router.get("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    return res.json({ data: todo });
  } catch (error) {
    handleErrors(res, error);
  }
});

// POST /todos
router.post("/todos", async (req, res) => {
  try {
    const newTodo = await Todo.create(req.body);
    return res.status(201).json({ message: "Todo created", data: newTodo });
  } catch (error) {
    handleErrors(res, error);
  }
});

// PUT /todos/:id
router.put("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    await Todo.update(req.body, { where: { id: todo.id } });
    return res.json({ message: "Todo updated" });
  } catch (error) {
    handleErrors(res, error);
  }
});

// DELETE /todos/:id
router.delete("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    await Todo.destroy({ where: { id: todo.id } });
    return res.json({ message: "Todo deleted" });
  } catch (error) {
    handleErrors(res, error);
  }
});

module.exports = router;
