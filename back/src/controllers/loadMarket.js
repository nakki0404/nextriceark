// loadMarket.js
const axios = require("axios");
const authorizationToken = process.env.API_KEY;
const searchdata = [
  {
    ItemClass: "재련",
    CategoryCode: 50000,
    PageNum: 7,
  },
  {
    ItemClass: "모험",
    CategoryCode: 100000,
    PageNum: 13,
  },
  {
    ItemClass: "배템",
    CategoryCode: 60000,
    PageNum: 6,
  },
  {
    ItemClass: "각인",
    CategoryCode: 40000,
    PageNum: 29,
  },
  {
    ItemClass: "음식",
    CategoryCode: 70000,
    PageNum: 9,
  },
  {
    ItemClass: "생활",
    CategoryCode: 90000,
    PageNum: 4,
  },
];
const newarray = [];
const getMakeList = async () => {
  for (const e of searchdata) {
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
          CategoryCode: e.CategoryCode,
          PageNo: pageNo,
        },
      };
      if (e.CategoryCode === 50000) {
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
      } else if (e.CategoryCode === 40000) {
        try {
          const response = await axios(config);
          const filteredItems = response.data.Items.filter((item) =>
            item.Grade.includes("전설")
          );
          return filteredItems;
        } catch (error) {
          console.log(error);
          return [];
        }
      } else if (e.CategoryCode === 70000) {
        try {
          const response = await axios(config);
          const filteredItems = response.data.Items.filter(
            (item) => item.BundleCount == 10
          );
          return filteredItems;
        } catch (error) {
          console.log(error);
          return [];
        }
      } else {
        try {
          const response = await axios(config);
          return response.data.Items;
        } catch (error) {
          console.log(error);
          return [];
        }
      }
    };

    const fetchData = async () => {
      const promises = [];
      for (let pageNo = 1; pageNo <= e.PageNum; pageNo++) {
        promises.push(getPageData(pageNo));
      }
      try {
        const resultArrays = await Promise.all(promises);
        const list = resultArrays.flat(); // Flatten the array of arrays
        const newobj = {
          ItemClass: e.ItemClass,
          ItemList: list,
        };
        newarray.push(newobj);
      } catch (error) {
        console.log(error);
      }
    };
    await fetchData();
  }
  return newarray;
};
module.exports = getMakeList;
