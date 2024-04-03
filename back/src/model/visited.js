const mongoose = require("mongoose");

const visitedSchema = new mongoose.Schema({
  Date: String,
  todayTotal: { type: Number, default: 0 },
});

const Visited = mongoose.model("visited", visitedSchema);

module.exports = Visited;
