const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  ID: {
    type: String,
    maxlength: 60,
  },
  Password: {
    type: String,
    maxlength: 60,
  },
  Question: {
    type: String,
    maxlength: 60,
  },
  Answer: {
    type: String,
    maxlength: 60,
  },
  Role: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
