const mongoose = require("mongoose");
require("dotenv").config();
var url = process.env.MONGOLAB_URI;
const uri = url;
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
