const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      defaultValue: "New",
    },
    label: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const todo = mongoose.model("Todos", todoSchema);

module.exports = todo;
