// loadMarket.js
const mongoose = require("mongoose");
const axios = require("axios");
const trading_data = require("../model/trading_data");
const marketList = require("../model/market");
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
const authorizationToken = process.env.API_KEY;
const getPageData = async (Id) => {
  const config = {
    method: "get",
    url: `https://developer-lostark.game.onstove.com/markets/items/${Id}`,
    headers: {
      accept: "application/json",
      authorization: `bearer ${authorizationToken}`,
      "content-Type": "application/json",
    },
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
const loadtrade = async () => {
  const IdList = await marketList.find({ Id: { $gt: 1000 } }, { Id: 1 });
  const promises = [];
  promises.push(...IdList.map((item) => getPageData(item.Id)));
  const resultArrays = await Promise.all(promises);
  const newlists = resultArrays.flat(); // Flatten the array of arrays
  const lists = newlists.filter((item) => item !== null);
  for (const list of lists) {
    const filter = { Name: list.Name };
    const existingDoc = await trading_data.findOne(filter);
    if (existingDoc) {
      const existingDocStats = existingDoc.Stats ? existingDoc.Stats : [];
      const listStats = list.Stats ? list.Stats : [];
      listStats.forEach((listStat) => {
        const existingStatIndex = existingDocStats.findIndex(
          (stat) => stat.Date === listStat.Date
        );
        if (existingStatIndex !== -1) {
          existingDocStats[existingStatIndex] = listStat;
        } else {
          existingDocStats.push(listStat);
        }
      });
      const updatedDocument = await trading_data.findOneAndUpdate(
        filter,
        {
          $set: {
            Stats: existingDocStats.sort(
              (a, b) => new Date(b.Date) - new Date(a.Date)
            ),
          },
        },
        { new: true }
      );
    } else {
      const newDocument = await trading_data.create(list);
    }
  }
};
module.exports = loadtrade;
