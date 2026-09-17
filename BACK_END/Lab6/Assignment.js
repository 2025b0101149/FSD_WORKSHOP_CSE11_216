import express from "express";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
const FILE = "userData.json";
if (!fs.existsSync(FILE)) {
  fs.writeFileSync(FILE, "[]");
}

app.post("/users", (req, res) => {
  let users = JSON.parse(fs.readFileSync(FILE));
  const user = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(user);
  fs.writeFileSync(FILE, JSON.stringify(users, null, 2));
  res.json(user);
});


app.get("/users", (req, res) => {
  const users = JSON.parse(fs.readFileSync(FILE));
  res.json(users);
});


app.put("/users/:id", (req, res) => {
  let users = JSON.parse(fs.readFileSync(FILE));
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
if (req.body.name) {
    user.name = req.body.name;
}
if (req.body.email) {
    user.email = req.body.email;
}
  fs.writeFileSync(FILE, JSON.stringify(users, null, 2));
  res.json(user);
});


app.delete("/users/:id", (req, res) => {
  let users = JSON.parse(fs.readFileSync(FILE));
  const id = parseInt(req.params.id);
  const newUsers = users.filter(u => u.id !== id);
  if (users.length === newUsers.length) {
    return res.status(404).json({ message: "User not found" });
  }
  fs.writeFileSync(FILE, JSON.stringify(newUsers, null, 2));
  res.json({ message: "User deleted" });
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});