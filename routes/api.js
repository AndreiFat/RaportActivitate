const express = require("express");
const task = require("../controller/controller.js");
const router = express.Router();

/* GET api */
router.get("/", function (req, res, next) {
  res.render("items");
});

/* GET api/items */
router.get("/items", task.viewAll);

/* POST api/items - save new item */
router.post("/items/save", task.save);

/* POST api/items - create new item */
router.post("/items/", function (req, res, next) {
  res.send("create new item");
});

/* GET api/items - get task */
router.get("/items/:id", task.getTask);

/* PUT api/items */
router.put("/items/:id", task.update_a_task);

/* DELETE api/items */
router.delete("/items/:id", task.deleteT);

module.exports = router;
