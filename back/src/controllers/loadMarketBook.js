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
      ItemGrade: "전설",
      CategoryCode: 40000,
      PageNo: pageNo,
    },
    // 40000번 전각 10이지 까지 아이템그레이드 "전설" 분당 100회
  };
  try {
    const response = await axios(config);
    return response.data.Items;
  } catch (error) {
    console.log(error);
    return [];
  }
};
const fetchDataBook = async () => {
  const promises = [];
  for (let pageNo = 1; pageNo <= 10; pageNo++) {
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
module.exports = fetchDataBook;
