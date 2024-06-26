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
    let response = await axios(config);
    return response.data;
  } catch (error) {
    return error;
  }
};

const loadtrade = async () => {
  try {
    const IdList = await marketList.find(
      { Id: { $gt: 1000 } },
      { Id: 1, Category: 1, Name: 1 }
    );

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    async function processDataWithDelay(IdList) {
      let promises = [];
      for (let i = 0; i < IdList.length; i++) {
        const data = await getPageData(IdList[i].Id);
        if (data instanceof Error) {
          if (data.response.status === 429) {
            await delay(60000);
            i--;
          } else {
            break;
          }
        } else {
          promises.push(data);
        }
      }
      const lists = promises.flat();
      lists.map(
        (a) => (a.Category = IdList.find((b) => b.Name == a.Name).Category)
      );
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
      console.log("done");
    }
    await processDataWithDelay(IdList);
  } catch (error) {
    console.log(error);
    return [];
  }
};

module.exports = loadtrade;
