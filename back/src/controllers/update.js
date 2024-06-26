//update.js
const mongoose = require("mongoose");
const marketList = require("../model/market");
const getMakeList = require("./loadMarket");
const jem = require("./loadjem"); // 파일 경로에 맞게 수정
const loadtrade = require("./loadtrade");
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ttcs9nu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

async function fetchDataAndUpdate() {
  try {
    const importedList = await getMakeList();
    const jemData = await jem();
    const conbined = [...importedList, ...jemData];
    await marketList.deleteMany({});
    await marketList.insertMany(conbined);
    await loadtrade();
  } catch (error) {
    console.log(error);
  }
}
module.exports = fetchDataAndUpdate;
