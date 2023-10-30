//update.js
const mongoose = require("mongoose");
const marketList = require("../model/market");
const getMakeList = require("./loadMarket");
const jem = require("./loadjem"); // 파일 경로에 맞게 수정
const loadtrade = require("./loadtrade");
const axios = require("axios");

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ttcs9nu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
    fetchDataAndUpdate();
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

async function fetchDataAndUpdate() {
  try {
    const importedList = await getMakeList();
    // const jemData = await jem(); // jem 함수 호출
    // const newobj = {
    //   ItemClass: e.ItemClass,
    //   ItemList: list,
    // };
    const combinedList = [...importedList]; // 두 배열 합치기
    // const combinedList = [...importedList, ...jemData]; // 두 배열 합치기
    await marketList.deleteMany({}); // 기존 데이터 모두 삭제
    const insertedData = await marketList.insertMany(combinedList);
    console.log(`Inserted ${insertedData.length} lists into MongoDB`);
    function executeWithDelay(fn, delay) {
      setTimeout(fn, delay);
    }
    executeWithDelay(() => loadtrade(), 70 * 1000);
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  fetchDataAndUpdate: fetchDataAndUpdate,
};
