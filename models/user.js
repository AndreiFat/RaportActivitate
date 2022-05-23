const mongoose = require("mongoose")
const {Schema} = require("mongoose");

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
});

const userModel = mongoose.model('Users', userSchema);
