var express = require("express");
const mongoose = require("mongoose");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
// Database Connection
mongoose.connect("mongodb://localhost:27017/localhostDB", {
  useNewUrlParser: true,
});
var conn = mongoose.connection;
conn.on("connected", function () {
  console.log("database is connected successfully");
});
conn.on("disconnected", function () {
  console.log("database is disconnected successfully");
});
conn.on("error", console.error.bind(console, "connection error:"));
module.exports = conn;
// End DataBase Connection

module.exports = router;
