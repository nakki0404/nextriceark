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

const MarketItem = mongoose.model("MarketItem", ItemSchema);

module.exports = MarketItem;
