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
  try {
    const IdList = await marketList.find({});
    let A = [];
    let count = 0;

    const delay = (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };
    const processIdList = async () => {
      for (let e of IdList) {
        let B = [];
        for (let i of e.ItemList) {
          let data;
          if (count % 90 === 0 && count !== 0) {
            await delay(65 * 1000); // 65초 대기
          }
          data = await getPageData(i.Id);
          B.push(...data);
          count++;
        }
        A.push({ ItemClass: e.ItemClass, Itemtrading_data: B });
      }
      const resultArrays = A;

      resultArrays.forEach(async (item) => {
        //최신 정보 foreach 돌려 원소마다 반복
        const existingItem = await trading_data.findOne({
          ItemClass: item.ItemClass,
        });
        //원소의 클래스이름을 가진 원소를 db에서 찾음

        if (existingItem) {
          //있으면
          item.Itemtrading_data.forEach((newDataItem) => {
            //최신정보 원소의 키값 배열 원소 반복
            const existingItemIndex = existingItem.Itemtrading_data.findIndex(
              (existingDataItem) => existingDataItem.Name === newDataItem.Name
            );
            //최신정보 vs 기존 정보 겹치는 내부 객체 인덱스구함.

            if (existingItemIndex !== -1) {
              //이름이 겹치는게 있으면
              const existingStats =
                existingItem.Itemtrading_data[existingItemIndex].Stats;
              //구형 정보 stats을 변수에 저장
              const newStats = newDataItem.Stats;
              // 신형정보 변수에 저장
              newStats.forEach((newStat) => {
                //신형정보 stat을 돌림
                const existingStatIndex = existingStats.findIndex(
                  (existingStat) => existingStat.Date === newStat.Date
                );
                //날짜 겹치는 인덱스 있나 찾아봄
                if (existingStatIndex !== -1) {
                  //있으면
                  existingStats[existingStatIndex].TradeCount =
                    newStat.TradeCount;
                  //새정보로 교체
                } else {
                  existingItem.Itemtrading_data[existingItemIndex].Stats.push(
                    newStat
                  );
                }
                //날짜 안겹치면 새정보 삽입
              });
            } else {
              //이름 겹치는게 없으면
              existingItem.Itemtrading_data.push(newDataItem);
            }
            //그대로 넣음
          });

          await trading_data.replaceOne(
            { ItemClass: item.ItemClass },
            existingItem
          );
          //변경된 db를 클래스 같은 db에 덮어씀
        } else {
          //없으면
          await trading_data.insertOne(item);
          //새로운 클래스는 삽입.
        }
      });
    };
    processIdList();
  } catch (error) {
    console.log(error);
    return [];
  }
};

module.exports = loadtrade;
