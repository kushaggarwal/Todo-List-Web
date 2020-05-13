const express = require("express");
const app = express();
const bodyPareser = require("body-parser");
const mongoose = require("mongoose");
// require("dotenv").config();

const dbConnection = require("./db/db.js");

const port = 5000;

app.get("/", (req, res) => {
  console.log("At new host");
});

// app.use(cors());
app.use(bodyPareser.json());

const todoRouter = require("./routes/todo");

app.use("/todos", todoRouter);

dbConnection();
app.listen(port, () => {
  console.log("Server is running" + port);
});
