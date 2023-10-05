const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();
const todoController = require("./controller/todo.controller");
const blogController = require("./controller/blog.controller");

// Middleware untuk menguraikan permintaan JSON
app.use(express.json());

// Menggunakan controller
app.use("/todos", todoController);
app.use("/blogs", blogController);

// Rute root ("/") untuk memberikan pesan sederhana
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Penanganan kesalahan umum
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
