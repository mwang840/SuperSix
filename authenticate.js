const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: "./config.env" });
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/sign-up", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/boardgame.html", (req, res) => {
  res.sendFile(path.join(__dirname + "/boardgame.html"));
});

app.use("/", express.static(path.join(__dirname, "")));

app.listen(port, () => {
  console.log(`Looks like this app is running on port ${port}`);
});
