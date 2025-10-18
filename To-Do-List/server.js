const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const crypto = require("crypto");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Server is running " });
});

let users = new Map();


  // POST /api/user
app.post("/api/user", (req, res) => {
  const { name, email, mobile, grid } = req.body;

  if (!name || !email) {
    return res.status(400).json({ status: "error", message: "Name and Email are required" });
  }

  const id = crypto.randomUUID();
  const newUser = { id, name, email, mobile, grid };

  users.set(id, newUser);

  res.json({ status: "success", message: "User inserted", data: newUser });
});

app.get("/api/user", (req, res) => {
  res.json({ status: "success", data: Array.from(users.values()) });
});

app.get("/api/user/:id", (req, res) => {
  const { id } = req.params;
  const user = users.get(id);

  if (!user) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }

  res.json({ status: "success", data: user });
});

app.put("/api/user/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, mobile, grid } = req.body;

  if (!users.has(id)) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }

  const updatedUser = { id, name, email, mobile, grid };
  users.set(id, updatedUser);

  res.json({ status: "success", message: "User updated", data: updatedUser });
});

app.delete("/api/user/:id", (req, res) => {
  const { id } = req.params;

  if (!users.has(id)) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }

  users.delete(id);

  res.json({ status: "success", message: "User deleted" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
