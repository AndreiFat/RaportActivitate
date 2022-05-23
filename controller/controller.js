const { taskModel } = require("../models/task");

let count = 0;
exports.save = (req, res) => {
  console.log("Post a Task: " + JSON.stringify(req.body));
  // Create a Customer
  // const taskName = req.body.taskName;
  console.log(req.body.taskName);
  const description = req.body.description;
  const week = req.body.week;
  //create new model [Object]
  count++;
  let newtask = new taskModel({
    taskName: req.body.taskName,
    week: week,
    description: description,
    dateAdded: new Date(),
    status: "Ongoing",
    image: "http://192.168.37.37/~stud8/0" + count + "/tema.png",
  });

  // Save a Customer in the MongoDB
  newtask
    .save()
    .then((data) => {
      taskModel.find().then((user) => {
        console.log(user);
        res.json(user);
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
exports.viewAll = (req, res) => {
  taskModel.find().then((user) => {
    console.log(user);
    res.json(user);
  });
};

exports.getTask = (req, res) => {
  const id = req.params.id;
  taskModel.findById({ _id: id }).then((task) => {
    console.log("id-ul task-ului " + task);
    console.log(count);
    res.render("itemID", {
      taskName: task.taskName,
      week: task.week,
      description: task.description,
      status: task.status,
      imagine: task.image,
    });
  });
};

exports.update_a_task = function (req, res) {
  console.log("am un update aici");
  const id = req.params.id;
  taskModel.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true },
    function (err, task) {
      if (err) res.send(err);
      res.json(task);
    }
  );
};
exports.deleteT = function (req, res) {
  console.log("am un delete aici");
  const id = req.params.id;
  taskModel.findOneAndDelete({ _id: id }).then((task) => {
    console.log("id-ul task-ului " + task);
    res.json(task);
  });
};
