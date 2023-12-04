const mongoose = require("mongoose");

const TextSchema = new mongoose.Schema({
  TextTitle: { type: String, required: false, maxlength: 90 },
  TextBody: { type: String, required: false, maxlength: 1500 },
  Category: String,
  Category2: String,
  _id: String,
  ID: { type: String, required: false, maxlength: 60 },
  Date: Date,
  FakeID: { type: String, required: false, maxlength: 60 },
  FakePassWord: { type: String, required: false, maxlength: 60 },
});
const Text = mongoose.model("Text", TextSchema);
module.exports = Text;
