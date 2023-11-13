const mongoose = require("mongoose");

const HasItemSchema = new mongoose.Schema({
  _id: {
    type: [String],
  },
  grade: {
    type: [String],
  },
  forwho: {
    type: [String],
  },
  category: {
    type: [String],
  },
  stat: {
    type: Object,
    default: {},
  },
  skill: {
    type: Object,
    default: {},
  },
  panalty: {
    type: Object,
    default: {},
  },
  location: {
    type: [String],
  },
});
const HasItemListsSchema = new mongoose.Schema({
  ID: String,
  Item: [HasItemSchema],
});

const HasItem = mongoose.model("HasItem", HasItemListsSchema);

module.exports = HasItem;
