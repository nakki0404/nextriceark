// loadMarket.js
const axios = require("axios");
const authorizationToken = process.env.API_KEY;
const searchdata = [
  {
    ItemClass: "재련",
    CategoryCode: 50000,
    PageNo: 7,
  },
  {
    ItemClass: "모험",
    CategoryCode: 100000,
    PageNo: 13,
  },
  {
    ItemClass: "재련",
    CategoryCode: 60000,
    PageNo: 6,
  },
  {
    ItemGrade: "전설",
    ItemClass: "재련",
    CategoryCode: 40000,
    PageNo: 10,
  },
  {
    ItemClass: "음식",
    CategoryCode: 70000,
    PageNo: 9,
  },
  {
    ItemClass: "생활",
    CategoryCode: 90000,
    PageNo: 4,
  },
];
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
      CategoryCode: 50000,
      PageNo: pageNo,
    },
  };
  try {
    const response = await axios(config);
    const itemsToExclude = [
      "수호석",
      "수호석 조각",
      "파괴석 조각",
      "생명의 돌파석",
      "별의 숨결",
      "조화의 파편 주머니(중)",
      "조화의 파편 주머니(소)",
      "조화의 돌파석",
      "달의 숨결",
      "아크투르스의 서 : 무기",
      "재봉술 : 매듭 기본",
      "재봉술 : 도안 기본",
      "야금술 : 접쇠 기본",
      "아크투르스의 의지 : 방어구",
      "크라테르의 지혜 : 무기",
      "아크투르스의 서 : 방어구",
      "크라테르의 지혜 : 방어구",
      "야금술 : 접쇠 심화",
      "야금술 : 주조 기본",
      "조화의 파편 주머니(대)",
      "재봉술 : 매듭 심화",
      "크라테르의 권능 : 방어구",
      "크라테르의 권능 : 무기",
      "아크투르스의 의지 : 무기",
      "크라테르의 서 : 무기",
      "크라테르의 서 : 방어구",
      "야금술 : 단조 복합",
    ];
    const filteredItems = response.data.Items.filter(
      (item) => !itemsToExclude.includes(item.Name)
    );
    return filteredItems;
  } catch (error) {
    console.log(error);
    return [];
  }
};
const fetchData = async () => {
  const promises = [];
  for (let pageNo = 1; pageNo <= 9; pageNo++) {
    promises.push(getPageData(pageNo));
  }
  try {
    const resultArrays = await Promise.all(promises);
    const list = resultArrays.flat(); // Flatten the array of arrays
    const condition = [
      "명예의 파편 주머니(소)",
      "명예의 파편 주머니(중)",
      "명예의 파편 주머니(대)",
    ];
    const resultList = list.filter((e) => condition.includes(e.Name));
    let result = 0;
    resultList.map((e) => {
      result += e.YDayAvgPrice;
    });
    const avg = result / 3000;
    const avghonor = {
      Id: 22,
      Name: "명예의 파편(낱개)",
      Grade: "일반",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_7_147.png",
      BundleCount: 1,
      TradeRemainCount: null,
      YDayAvgPrice: avg,
      RecentPrice: 1,
      CurrentMinPrice: 1,
    };
    const newList = [...list, avghonor];
    return newList;
  } catch (error) {
    console.log(error);
    return [];
  }
};
module.exports = fetchData;
