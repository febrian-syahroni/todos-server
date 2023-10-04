const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();
const todoController = require("./controller/todo.controller");
const blogController = require("./controller/blog.controller");

app.use(express.json());
app.use(todoController);
app.use(blogController);

app.get("/", (req, res) => {
  res.send("<h1>Server telah berjalan</h1>");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
