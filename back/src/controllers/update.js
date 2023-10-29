//update.js
const mongoose = require("mongoose");
const marketList = require("../model/market");
const marketAdventureList = require("../model/marketAdventure");
const marketBattleList = require("../model/marketBattle");
const marketBookList = require("../model/marketBook");
const marketFoodList = require("../model/marketFood");
const marketLifeList = require("../model/marketLife");
const fetchData = require("./loadMarket");
const jem = require("./loadjem"); // 파일 경로에 맞게 수정
const loadtrade = require("./loadtrade");
const fetchDataLife = require("./loadMarketLife");
const fetchDataFood = require("./loadMarketFood");
const fetchDataBattle = require("./loadMarketBattle");
const fetchDataBook = require("./loadMarketBook");
const fetchDataAdventure = require("./loadMarketAdventure");
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
    const importedList = await fetchData();
    const importedList2 = await fetchDataAdventure();
    const importedList3 = await fetchDataBook();
    const importedList4 = await fetchDataBattle();
    const importedList5 = await fetchDataFood();
    const importedList6 = await fetchDataLife();
    const jemData = await jem(); // jem 함수 호출
    const combinedList = [...importedList, ...jemData]; // 두 배열 합치기

    await marketList.deleteMany({}); // 기존 데이터 모두 삭제
    const insertedData = await marketList.insertMany(combinedList);
    console.log(`Inserted ${insertedData.length} items into MongoDB`);

    await marketAdventureList.deleteMany({}); // 기존 데이터 모두 삭제
    const insertedData2 = await marketAdventureList.insertMany(importedList2);
    console.log(
      `Inserted ${insertedData2.length} Adventure items into MongoDB`
    );

    await marketBattleList.deleteMany({}); // 기존 데이터 모두 삭제
    const insertedData4 = await marketBattleList.insertMany(importedList4);
    console.log(`Inserted ${insertedData4.length} Battle items into MongoDB`);

    await marketBookList.deleteMany({}); // 기존 데이터 모두 삭제
    const insertedData3 = await marketBookList.insertMany(importedList3);
    console.log(`Inserted ${insertedData3.length} Book items into MongoDB`);

    await marketFoodList.deleteMany({}); // 기존 데이터 모두 삭제
    const insertedData5 = await marketFoodList.insertMany(importedList5);
    console.log(`Inserted ${insertedData5.length} Food items into MongoDB`);

    await marketLifeList.deleteMany({}); // 기존 데이터 모두 삭제
    const insertedData6 = await marketLifeList.insertMany(importedList6);
    console.log(`Inserted ${insertedData6.length} Life items into MongoDB`);
    // loadtrade();
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  fetchDataAndUpdate: fetchDataAndUpdate,
};
