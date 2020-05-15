const router = require("express").Router();
let todo = require("../models/todo");

router.route("/").post((req, res) => {
  console.log("At todods");
  const status = req.body.status;
  const label = req.body.label;
  const title = req.body.title;
  const content = req.body.content;
  const dueDate = Date.parse(req.body.dueDate);

  const newTodo = new todo({
    status,
    label,
    title,
    content,
    dueDate,
  });

  newTodo
    .save()
    .then(() => {
      res.json("Todo Added");
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
