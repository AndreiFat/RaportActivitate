const express = require("express");
const router = express.Router();

/* GET tasks */
router.get("/", function (req, res, next) {
  res.render("items");
});

module.exports = router;
