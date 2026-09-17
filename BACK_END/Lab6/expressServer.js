import express from "express";
import os from "os";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

let userData = [
  { id: 1, name: "Anmol Teotia", email: "avs@gmail.com" },
  { id: 2, name: "Anshuman", email: "akarsh@gmail.com" },
  { id: 3, name: "Ansh", email: "arsh@gmail.com" },
  { id: 4, name: "Anuj", email: "ashwani@gmail.com" },
];

let registeredData = [
  { id: 1, name: "Anmol Teotia", email: "ak@gmail.com" },
  { id: 2, name: "Anshuman", email: "akarsh@gmail.com" },
  { id: 3, name: "Ansh", email: "arsh@gmail.com" },
  { id: 4, name: "Anuj", email: "anwar@gmail.com" },
];

app.get("/", (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to Express Server" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

app.get("/msg", (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to Express ServerMessage Dropbox" });
  } catch (error) {
    res.status(500).json({ error: "Message Error", details: error.message });
  }
});

app.get("/sys", (req, res) => {
  try {
    res.status(200).json({
      msg: "System Information",
      info: { platform: os.platform(), uptime: os.uptime() },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

app.get("/user", (req, res) => {
  try {
    res.status(200).json({ msg: "User info retrieved", data: userData });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

app.post("/create", (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name or email" });
    }
    const newUser = { id: userData.length + 1, name, email };
    userData.push(newUser);
    res.status(201).json({
      msg: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

app.get("/user/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = userData.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json({ msg: "User retrieved successfully", data: user });
});

app.put("/user/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = userData.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (req.body.name) {
    user.name = req.body.name;
  }

  if (req.body.email) {
    user.email = req.body.email;
  }

  res.status(200).json({ msg: "User updated successfully", data: user });
});

app.delete("/user/:id", (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const exists = userData.some((u) => u.id === userId);

    if (!exists) return res.status(404).json({ error: "User not found" });

    userData = userData.filter((u) => u.id !== userId);
    res.status(200).json({ msg: `User ${userId} deleted successfully` });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

app.get("/registered", (req, res) => {
  try {
    res
      .status(200)
      .json({ msg: "Registered data retrieved", data: registeredData });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

app.post("/registered", (req, res) => {
  try {
    const { id, name, email } = req.body;

    if (!id || !name || !email) {
      return res
        .status(400)
        .json({ error: "Missing required fields: id, name, or email" });
    }

    if (registeredData.some((u) => u.id === id)) {
      return res
        .status(409)
        .json({ error: "A user with this ID is already registered" });
    }

    const newUser = { id, name, email };
    registeredData.push(newUser);
    res
      .status(201)
      .json({ msg: "User registered successfully", data: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});