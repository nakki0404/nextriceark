// loadMarket.js
const axios = require("axios");
const authorizationToken = process.env.API_KEY;
const getPageData = async (pageNo) => {
  const config = {
    method: "post",
    url: "https://developer-lostark.game.onstove.com/auctions/items",
    headers: {
      accept: "application/json",
      authorization: `bearer ${authorizationToken}`,
      "content-Type": "application/json",
    },
    data: {
      ItemLevelMin: 0,
      ItemLevelMax: 0,
      ItemGradeQuality: null,
      SkillOptions: [
        {
          FirstOption: null,
          SecondOption: null,
          MinValue: null,
          MaxValue: null,
        },
      ],
      EtcOptions: [
        {
          FirstOption: null,
          SecondOption: null,
          MinValue: null,
          MaxValue: null,
        },
      ],
      Sort: "BidStart_Price",
      CategoryCode: 210000,
      CharacterClass: "",
      ItemTier: 3,
      ItemGrade: "",
      ItemName: "5레벨",
      PageNo: pageNo,
      SortCondition: "ASC",
    },
  };
  try {
    const response = await axios(config);
    return response.data.Items;
  } catch (error) {
    console.log(error);
    return [];
  }
};
const loadjem = async () => {
  const promises = [];
  for (let pageNo = 0; pageNo <= 10; pageNo++) {
    promises.push(getPageData(pageNo));
  }
  try {
    const resultArrays = await Promise.all(promises);
    const list = resultArrays.flat(); // Flatten the array of arrays
    const newlist = list.map((i) => i.AuctionInfo.BuyPrice);
    const sum = newlist.reduce((total, num) => {
      if (num !== null && num < 3000) {
        return total + num;
      } else {
        return total;
      }
    }, 0);
    function countNonNullElements(arr) {
      let count = 0;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== null && arr[i] < 3000) {
          count++;
        }
      }
      return count;
    }
    const nonNullCount = countNonNullElements(newlist);
    const avg = sum / nonNullCount;
    return avg;
  } catch (error) {
    console.log(error);
    return [];
  }
};
async function jem() {
  const avg = await loadjem();
  const etc = [
    {
      Id: 1,
      Category: "기타",
      Name: "골드",
      Grade: "일반",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/money/money_4.png",
      BundleCount: 1,
      TradeRemainCount: null,
      YDayAvgPrice: 1,
      RecentPrice: 1,
      CurrentMinPrice: 1,
      __v: 0,
    },
    {
      Id: 2,
      Category: "기타",
      Name: "더보기 골드",
      Grade: "일반",
      Icon: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FPrU44%2FbtszpBxVLgu%2Fz3mqnQKEdV41pHQIVxgXs1%2Fimg.png",
      BundleCount: 1,
      TradeRemainCount: null,
      YDayAvgPrice: -1,
      RecentPrice: 1,
      CurrentMinPrice: 1,
      __v: 0,
    },
    {
      Id: 3,
      Category: "기타",
      Name: "1레벨 보석",
      Grade: "일반",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_46.png",
      BundleCount: 1,
      TradeRemainCount: null,
      YDayAvgPrice: (avg / 3 / 3 / 3 / 3).toFixed(1),
      RecentPrice: 1,
      CurrentMinPrice: 1,
      __v: 0,
    },
    {
      Id: 4,
      Category: "기타",
      Name: "2레벨 보석",
      Grade: "일반",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_47.png",
      BundleCount: 1,
      TradeRemainCount: null,
      YDayAvgPrice: (avg / 3 / 3 / 3).toFixed(1),
      RecentPrice: 1,
      CurrentMinPrice: 1,
      __v: 0,
    },
    {
      Id: 5,
      Category: "기타",
      Name: "3레벨 보석",
      Grade: "일반",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_48.png",
      BundleCount: 1,
      TradeRemainCount: null,
      YDayAvgPrice: (avg / 3 / 3).toFixed(1),
      RecentPrice: 1,
      CurrentMinPrice: 1,
      __v: 0,
    },
    {
      Id: 6,
      Category: "기타",
      Name: "4레벨 보석",
      Grade: "일반",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_49.png",
      BundleCount: 1,
      TradeRemainCount: null,
      YDayAvgPrice: (avg / 3).toFixed(1),
      RecentPrice: 1,
      CurrentMinPrice: 1,
      __v: 0,
    },
    {
      Id: 7,
      Category: "기타",
      Name: "5레벨 보석",
      Grade: "일반",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_50.png",
      BundleCount: 1,
      TradeRemainCount: null,
      YDayAvgPrice: avg.toFixed(1),
      RecentPrice: 1,
      CurrentMinPrice: 1,
      __v: 0,
    },
    {
      Id: 8,
      Category: "기타",
      Name: "혼돈의 돌",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_6_89.png",
      BundleCount: 1,
      TradeRemainCount: null,
      YDayAvgPrice: 0,
      RecentPrice: 1,
      CurrentMinPrice: 1,
      Grade: "일반",
      __v: 0,
    },
    {
      Id: 9,
      Category: "기타",
      Name: "마수의 뼈",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_3_101.png",
      BundleCount: 1,
      TradeRemainCount: null,
      YDayAvgPrice: 0,
      RecentPrice: 1,
      CurrentMinPrice: 1,
      Grade: "일반",
      __v: 0,
    },
    {
      Id: 10,
      Category: "기타",
      Name: "욕망의 날개",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_3_124.png",
      BundleCount: 1,
      TradeRemainCount: null,
      YDayAvgPrice: 0,
      RecentPrice: 1,
      CurrentMinPrice: 1,
      Grade: "일반",
      __v: 0,
    },
    {
      Id: 11,
      Category: "기타",
      Name: "광기의 나팔",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_10_19.png",
      BundleCount: 1,
      TradeRemainCount: null,
      YDayAvgPrice: 0,
      RecentPrice: 1,
      CurrentMinPrice: 1,
      Grade: "일반",
      __v: 0,
    },
    {
      Id: 12,
      Category: "기타",
      Name: "몽환의 사념",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_10_80.png",
      BundleCount: 1,
      TradeRemainCount: null,
      YDayAvgPrice: 0,
      RecentPrice: 1,
      CurrentMinPrice: 1,
      Grade: "일반",
      __v: 0,
    },
    {
      Id: 13,
      Category: "기타",
      Name: "쇠락의 눈동자",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_11_19.png",
      BundleCount: 1,
      TradeRemainCount: null,
      YDayAvgPrice: 0,
      RecentPrice: 1,
      CurrentMinPrice: 1,
      Grade: "일반",
      __v: 0,
    },
    {
      Id: 14,
      Category: "기타",
      Name: "시련의 빛",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_10_164.png",
      BundleCount: 1,
      TradeRemainCount: null,
      YDayAvgPrice: 0,
      RecentPrice: 1,
      CurrentMinPrice: 1,
      Grade: "일반",
      __v: 0,
    },
    {
      Id: 15,
      Category: "기타",
      Name: "관조의 빛무리",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_10_163.png",
      BundleCount: 1,
      TradeRemainCount: null,
      YDayAvgPrice: 0,
      RecentPrice: 1,
      CurrentMinPrice: 1,
      Grade: "일반",
      __v: 0,
    },
    {
      Id: 16,
      Category: "기타",
      Name: "선명한 지혜의 엘릭서",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_11_147.png",
      BundleCount: 1,
      TradeRemainCount: null,
      YDayAvgPrice: 0,
      RecentPrice: 1,
      CurrentMinPrice: 1,
      Grade: "일반",
      __v: 0,
    },
    {
      Id: 17,
      Category: "기타",
      Name: "빛나는 지혜의 엘릭서",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_11_146.png",
      BundleCount: 1,
      TradeRemainCount: null,
      YDayAvgPrice: 0,
      RecentPrice: 1,
      CurrentMinPrice: 1,
      Grade: "일반",
      __v: 0,
    },
    {
      Id: 18,
      Category: "기타",
      Name: "선명한 지혜의 기운",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_3_111.png",
      BundleCount: 1,
      TradeRemainCount: null,
      YDayAvgPrice: 0,
      RecentPrice: 1,
      CurrentMinPrice: 1,
      Grade: "일반",
      __v: 0,
    },
    {
      Id: 19,
      Category: "기타",
      Name: "빛나는 지혜의 기운",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_3_67.png",
      BundleCount: 1,
      TradeRemainCount: null,
      YDayAvgPrice: 0,
      RecentPrice: 1,
      CurrentMinPrice: 1,
      Grade: "일반",
      __v: 0,
    },
    {
      Id: 20,
      Category: "기타",
      Name: "어둠의 불",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_11_239.png",
      BundleCount: 1,
      TradeRemainCount: null,
      YDayAvgPrice: 0,
      RecentPrice: 1,
      CurrentMinPrice: 1,
      Grade: "일반",
      __v: 0,
    },
    {
      Id: 21,
      Category: "기타",
      Name: "마력의 샘물",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_11_237.png",
      BundleCount: 1,
      TradeRemainCount: null,
      YDayAvgPrice: 0,
      RecentPrice: 1,
      CurrentMinPrice: 1,
      Grade: "일반",
      __v: 0,
    },
    {
      Id: 22,
      Category: "기타",
      Name: "담금질 : 알키오네의 눈",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_54.png",
      BundleCount: 1,
      TradeRemainCount: null,
      YDayAvgPrice: 0,
      RecentPrice: 1,
      CurrentMinPrice: 1,
      Grade: "일반",
      __v: 0,
    },
    {
      Id: 23,
      Category: "기타",
      Name: "담금질 : 아그리스의 비늘",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_12_53.png",
      BundleCount: 1,
      TradeRemainCount: null,
      YDayAvgPrice: 0,
      RecentPrice: 1,
      CurrentMinPrice: 1,
      Grade: "일반",
      __v: 0,
    },
    {
      Id: 24,
      Category: "기타",
      Name: "농축 돌파석",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_11_18.png",
      BundleCount: 1,
      TradeRemainCount: null,
      YDayAvgPrice: 0,
      RecentPrice: 1,
      CurrentMinPrice: 1,
      Grade: "일반",
      __v: 0,
    },
    {
      Id: 25,
      Category: "기타",
      Name: "심화 돌파석",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_7_171.png",
      BundleCount: 1,
      TradeRemainCount: null,
      YDayAvgPrice: 0,
      RecentPrice: 1,
      CurrentMinPrice: 1,
      Grade: "일반",
      __v: 0,
    },
    {
      Id: 26,
      Category: "기타",
      Name: "융합 돌파석",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_7_173.png",
      BundleCount: 1,
      TradeRemainCount: null,
      YDayAvgPrice: 0,
      RecentPrice: 1,
      CurrentMinPrice: 1,
      Grade: "일반",
      __v: 0,
    },
  ];
  return etc;
}
module.exports = jem;
