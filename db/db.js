const mongoose = require("mongoose");

const uri =
  "mongodb+srv://user:Password@cluster1-xenqr.mongodb.net/TodoList?retryWrites=true&w=majority";

function dbConnection() {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  mongoose.connection
    .once("open", function () {
      console.log("Conection has been made!");
    })
    .on("error", function (error) {
      console.log("Error is: ", error);
    });
}

module.exports = dbConnection;
