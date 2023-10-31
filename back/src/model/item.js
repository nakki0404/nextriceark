const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    Id: Number,
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

const MarketSchema = new mongoose.Schema({
  Title: String,
  List: [ItemSchema], // List는 ItemSchema의 배열
});

const MarketItem = mongoose.model("MarketItem", MarketSchema);

module.exports = MarketItem;
