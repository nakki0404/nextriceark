const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  ID: String,
  Password: String,
  Question: String,
  Anwser: String,
  Role: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
