const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    Id: Number,
    Category: String,
    Name: String,
    Grade: String,
    Icon: String,
    BundleCount: Number,
    TradeRemainCount: Number,
    YDayAvgPrice: Number,
    RecentPrice: Number,
    CurrentMinPrice: Number,
    Quantity: Number,
    Quantity2: Number,
  },
  { _id: false }
); // _id 필드 사용 안 함
const ContentListsSchema = new mongoose.Schema({
  _id: { type: String, required: false },
  Title: String,
  List: [ItemSchema],
  Category: String,
  ID: { type: String, required: false },
});

const MarketItem = mongoose.model("MarketItem", ContentListsSchema);

module.exports = MarketItem;
