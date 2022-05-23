const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const taskSchema = new Schema({
  taskName: String,
  description: String,
  week: Date,
  dateAdded: Date,
  status: String,
  image: String,
});
const taskModel = mongoose.model("Tasks", taskSchema);

module.exports = {
  taskModel: taskModel,
};
