// loadMarket.js
const axios = require("axios");
const authorizationToken = process.env.API_KEY;
const getPageData = async (pageNo) => {
  const config = {
    method: "post",
    url: "https://developer-lostark.game.onstove.com/markets/items",
    headers: {
      accept: "application/json",
      authorization: `bearer ${authorizationToken}`,
      "content-Type": "application/json",
    },
    data: {
      CategoryCode: 100000,
      PageNo: pageNo,
    },
    // 10번 모험서 13페이지
  };
  try {
    const response = await axios(config);
    return response.data.Items;
  } catch (error) {
    console.log(error);
    return [];
  }
};
const fetchDataAdventure = async () => {
  const promises = [];
  for (let pageNo = 1; pageNo <= 13; pageNo++) {
    promises.push(getPageData(pageNo));
  }
  try {
    const resultArrays = await Promise.all(promises);
    const list = resultArrays.flat(); // Flatten the array of arrays
    const newList = [...list];
    return newList;
  } catch (error) {
    console.log(error);
    return [];
  }
};
module.exports = fetchDataAdventure;
