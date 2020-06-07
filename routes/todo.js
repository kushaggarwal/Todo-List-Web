const router = require("express").Router();
let todo = require("../models/todo");
const { ensureAuthenticated } = require("../config/auth");

router.route("/").post((req, res) => {
  console.log("At todods");
  const status = req.body.status;
  const label = req.body.label;
  const title = req.body.title;
  const content = req.body.content;
  const dueDate = req.body.dueDate;
  const userid = req.user._id;
  const newTodo = new todo({
    userid,
    status,
    label,
    title,
    content,
    dueDate,
  });

  newTodo
    .save()
    .then(() => {
      res.redirect("/todos/list");
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/list").get((req, res) => {
  todo
    .find({ userid: req.user._id })
    .then((data) => {
      res.render("todo", { data });
    })
    .catch((err) => {
      res.status(400).json("Error" + err);
    });
});

router.route("/delete").get((req, res) => {
  todo
    .findOne({ _id: req.query.Id, userid: req.user._id }, function (
      error,
      task
    ) {
      console.log("This object will get deleted " + task);
      task.remove();
    })
    .then(() => {
      console.log("In then");
      res.redirect("/todos/list");
    });
});

router.route("/label").get((req, res) => {
  todo.find({ label: req.query.label, userid: req.user._id }).then((data) => {
    res.render("todo", { data: data });
  });
});
router.route("/status").get((req, res) => {
  todo.find({ status: req.query.status, userid: req.user._id }).then((data) => {
    res.render("todo", { data: data });
  });
});
router.route("/status").get((req, res) => {
  todo.find({ status: req.query.status, userid: req.user._id }).then((data) => {
    res.render("todo", { data: data });
  });
});
router.route("/update").post((req, res) => {
  console.log(req.body);
  todo.findByIdAndUpdate(
    { _id: req.body.id, userid: req.user._id },
    req.body,
    function (err, post) {
      if (err) return next(err);
      res.redirect("/todos/list");
    }
  );
});
router.route("/:id").get((req, res) => {
  todo
    .findOne({ _id: req.params.id, userid: req.user._id }, function (
      error,
      task
    ) {
      console.log("This object will get edited " + task);
    })
    .then((data) => {
      res.send({ result: data });
    });
});

module.exports = router;
