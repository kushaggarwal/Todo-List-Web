const express = require("express");
const app = express();
const bodyPareser = require("body-parser");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const session = require("express-session");
require("dotenv").config();
const dbConnection = require("./db/db.js");
const User = require("./models/user");
const flash = require("connect-flash");
const passport = require("passport");
require("./config/passport")(passport);

app.use(bodyPareser.json());

app.engine("handlebars", exphbs());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secret",
    resave: true,
    SaveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.set("view engine", "hbs");
app.use(express.static("public"));

const port = 5000;

app.use(bodyPareser.json());

const todoRouter = require("./routes/todo");
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/user"));

app.use("/todos", todoRouter);
app.get("/new", (req, res) => {
  res.render("new");
});
const hbs = require("hbs");
hbs.registerHelper("equal", require("handlebars-helper-equal"));
dbConnection();
app.listen(port, () => {
  console.log("Server is running" + port);
});
