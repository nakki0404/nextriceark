const mongoose = require("mongoose");

const TextSchema = new mongoose.Schema({
  TextTitle: String,
  TextBody: String,
  Category: String,
  Category2: String,
  _id: String,
  ID: { type: String, required: false },
  Date: Date,
  FakeID: { type: String, required: false },
  FakePassWord: { type: String, required: false },
});
const Text = mongoose.model("Text", TextSchema);
module.exports = Text;
