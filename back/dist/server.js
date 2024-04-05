/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controllers/loadMarket.js":
/*!***************************************!*\
  !*** ./src/controllers/loadMarket.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// loadMarket.js
const axios = __webpack_require__(/*! axios */ "axios");
const authorizationToken = process.env.API_KEY;
const searchdata = [{
  Category: "재련",
  CategoryCode: 50000,
  PageNum: 7
}, {
  Category: "모험",
  CategoryCode: 100000,
  PageNum: 13
}, {
  Category: "배템",
  CategoryCode: 60000,
  PageNum: 6
}, {
  Category: "각인",
  CategoryCode: 40000,
  PageNum: 29
}, {
  Category: "음식",
  CategoryCode: 70000,
  PageNum: 9
}, {
  Category: "생활",
  CategoryCode: 90000,
  PageNum: 4
}];
let newarray = [];
const getMakeList = async () => {
  for (const e of searchdata) {
    const getPageData = async pageNo => {
      const config = {
        method: "post",
        url: "https://developer-lostark.game.onstove.com/markets/items",
        headers: {
          accept: "application/json",
          authorization: `bearer ${authorizationToken}`,
          "content-Type": "application/json"
        },
        data: {
          CategoryCode: e.CategoryCode,
          PageNo: pageNo
        }
      };
      const response = await axios(config);
      if (e.CategoryCode === 50000) {
        try {
          const itemsToExclude = ["수호석", "수호석 조각", "파괴석 조각", "생명의 돌파석", "별의 숨결", "조화의 파편 주머니(중)", "조화의 파편 주머니(소)", "조화의 돌파석", "달의 숨결", "아크투르스의 서 : 무기", "재봉술 : 매듭 기본", "재봉술 : 도안 기본", "야금술 : 접쇠 기본", "아크투르스의 의지 : 방어구", "크라테르의 지혜 : 무기", "아크투르스의 서 : 방어구", "크라테르의 지혜 : 방어구", "야금술 : 접쇠 심화", "야금술 : 주조 기본", "조화의 파편 주머니(대)", "재봉술 : 매듭 심화", "크라테르의 권능 : 방어구", "크라테르의 권능 : 무기", "아크투르스의 의지 : 무기", "크라테르의 서 : 무기", "크라테르의 서 : 방어구", "야금술 : 단조 복합"];
          const filteredItems = response.data.Items.filter(item => !itemsToExclude.includes(item.Name));
          return filteredItems;
        } catch (error) {
          console.log(error);
          return [];
        }
      } else if (e.CategoryCode === 40000) {
        try {
          const filteredItems = response.data.Items.filter(item => item.Grade.includes("전설"));
          return filteredItems;
        } catch (error) {
          console.log(error);
          return [];
        }
      } else if (e.CategoryCode === 70000) {
        try {
          const filteredItems = response.data.Items.filter(item => item.BundleCount == 10);
          return filteredItems;
        } catch (error) {
          console.log(error);
          return [];
        }
      } else {
        try {
          return response.data.Items;
        } catch (error) {
          console.log(error);
          return [];
        }
      }
    };
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    const fetchData = async () => {
      const promises = [];
      for (let pageNo = 1; pageNo <= e.PageNum; pageNo++) {
        const data = await getPageData(pageNo);
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

        // promises.push(getPageData(pageNo));
      }
      try {
        const resultArrays = await Promise.all(promises);
        const list = resultArrays.flat(); // Flatten the array of arrays
        let newlist = list;
        newlist.map(i => i.Category = e.Category);
        if (e.CategoryCode === 50000) {
          const condition = ["명예의 파편 주머니(소)", "명예의 파편 주머니(중)", "명예의 파편 주머니(대)"];
          const resultList = list.filter(e => condition.includes(e.Name));
          let result = 0;
          resultList.map(e => {
            result += e.YDayAvgPrice;
          });
          const avg = result / 3000;
          const avghonor = {
            Id: 22,
            Category: "재련",
            Name: "명예의 파편(낱개)",
            Grade: "일반",
            Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_7_147.png",
            BundleCount: 1,
            TradeRemainCount: null,
            YDayAvgPrice: avg,
            RecentPrice: 1,
            CurrentMinPrice: 1
          };
          newlist.push(avghonor);
        }
        newarray = [...newarray, ...newlist];
      } catch (error) {
        console.log(error);
      }
    };
    await fetchData();
  }
  return newarray;
};
module.exports = getMakeList;

/***/ }),

/***/ "./src/controllers/loadjem.js":
/*!************************************!*\
  !*** ./src/controllers/loadjem.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// loadMarket.js
const axios = __webpack_require__(/*! axios */ "axios");
const authorizationToken = process.env.API_KEY;
const getPageData = async pageNo => {
  const config = {
    method: "post",
    url: "https://developer-lostark.game.onstove.com/auctions/items",
    headers: {
      accept: "application/json",
      authorization: `bearer ${authorizationToken}`,
      "content-Type": "application/json"
    },
    data: {
      ItemLevelMin: 0,
      ItemLevelMax: 0,
      ItemGradeQuality: null,
      SkillOptions: [{
        FirstOption: null,
        SecondOption: null,
        MinValue: null,
        MaxValue: null
      }],
      EtcOptions: [{
        FirstOption: null,
        SecondOption: null,
        MinValue: null,
        MaxValue: null
      }],
      Sort: "BidStart_Price",
      CategoryCode: 210000,
      CharacterClass: "",
      ItemTier: 3,
      ItemGrade: "",
      ItemName: "5레벨",
      PageNo: pageNo,
      SortCondition: "ASC"
    }
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
    const newlist = list.map(i => i.AuctionInfo.BuyPrice);
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
  const etc = [{
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
    __v: 0
  }, {
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
    __v: 0
  }, {
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
    __v: 0
  }, {
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
    __v: 0
  }, {
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
    __v: 0
  }, {
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
    __v: 0
  }, {
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
    __v: 0
  }, {
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
    __v: 0
  }, {
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
    __v: 0
  }, {
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
    __v: 0
  }, {
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
    __v: 0
  }, {
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
    __v: 0
  }, {
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
    __v: 0
  }, {
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
    __v: 0
  }, {
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
    __v: 0
  }, {
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
    __v: 0
  }, {
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
    __v: 0
  }, {
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
    __v: 0
  }, {
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
    __v: 0
  }, {
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
    __v: 0
  }, {
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
    __v: 0
  }, {
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
    __v: 0
  }, {
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
    __v: 0
  }, {
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
    __v: 0
  }, {
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
    __v: 0
  }, {
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
    __v: 0
  }];
  return etc;
}
module.exports = jem;

/***/ }),

/***/ "./src/controllers/loadtrade.js":
/*!**************************************!*\
  !*** ./src/controllers/loadtrade.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// loadMarket.js
const mongoose = __webpack_require__(/*! mongoose */ "mongoose");
const axios = __webpack_require__(/*! axios */ "axios");
const trading_data = __webpack_require__(/*! ../model/trading_data */ "./src/model/trading_data.js");
const marketList = __webpack_require__(/*! ../model/market */ "./src/model/market.js");
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ttcs9nu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MONGO CONNECTION OPEN!!!");
}).catch(err => {
  console.log("OH NO MONGO CONNECTION ERROR!!!!");
  console.log(err);
});
const authorizationToken = process.env.API_KEY;

// 문제점
// 단순한 반복으로 인한 429에러

//해결책
//먼저 보낸 응답을 확인하고 응답에 따라 다음 id 로드하기.

const getPageData = async Id => {
  const config = {
    method: "get",
    url: `https://developer-lostark.game.onstove.com/markets/items/${Id}`,
    headers: {
      accept: "application/json",
      authorization: `bearer ${authorizationToken}`,
      "content-Type": "application/json"
    }
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
    const IdList = await marketList.find({
      Id: {
        $gt: 1000
      }
    }, {
      Id: 1,
      Category: 1,
      Name: 1
    });
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
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

        // promises.push(getPageData(IdList[i].Id));
        // if ((i + 1) % 90 === 0) {
        //   await delay(65000); // 65초 대기
        //   console.log("pause");
        // }
      }
      // const resultArrays = await Promise.all(promises);
      const lists = promises.flat();
      // console.log(promises);
      lists.map(a => a.Category = IdList.find(b => b.Name == a.Name).Category);
      for (const list of lists) {
        const filter = {
          Name: list.Name
        };
        const existingDoc = await trading_data.findOne(filter);
        if (existingDoc) {
          const existingDocStats = existingDoc.Stats ? existingDoc.Stats : [];
          const listStats = list.Stats ? list.Stats : [];
          listStats.forEach(listStat => {
            const existingStatIndex = existingDocStats.findIndex(stat => stat.Date === listStat.Date);
            if (existingStatIndex !== -1) {
              existingDocStats[existingStatIndex] = listStat;
            } else {
              existingDocStats.push(listStat);
            }
          });
          const updatedDocument = await trading_data.findOneAndUpdate(filter, {
            $set: {
              Stats: existingDocStats.sort((a, b) => new Date(b.Date) - new Date(a.Date))
            }
          }, {
            new: true
          });
        } else {
          const newDocument = await trading_data.create(list);
        }
      }
      console.log("done");
    }
    processDataWithDelay(IdList);
  } catch (error) {
    console.log(error);
    return [];
  }
};
module.exports = loadtrade;

/***/ }),

/***/ "./src/controllers/update.js":
/*!***********************************!*\
  !*** ./src/controllers/update.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

//update.js
const mongoose = __webpack_require__(/*! mongoose */ "mongoose");
const marketList = __webpack_require__(/*! ../model/market */ "./src/model/market.js");
const getMakeList = __webpack_require__(/*! ./loadMarket */ "./src/controllers/loadMarket.js");
const jem = __webpack_require__(/*! ./loadjem */ "./src/controllers/loadjem.js"); // 파일 경로에 맞게 수정
const loadtrade = __webpack_require__(/*! ./loadtrade */ "./src/controllers/loadtrade.js");
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ttcs9nu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MONGO CONNECTION OPEN!!!");
  fetchDataAndUpdate();
}).catch(err => {
  console.log("OH NO MONGO CONNECTION ERROR!!!!");
  console.log(err);
});
async function fetchDataAndUpdate() {
  try {
    // const importedList = await getMakeList();
    // const jemData = await jem(); // jem 함수 호출
    // const conbined = [...importedList, ...jemData];
    // await marketList.deleteMany({}); // 기존 데이터 모두 삭제
    // await marketList.insertMany(conbined);
    // setTimeout(() => loadtrade(), 65000);
  } catch (error) {
    console.log(error);
  }
}
module.exports = fetchDataAndUpdate;

/***/ }),

/***/ "./src/model/captchaCode.js":
/*!**********************************!*\
  !*** ./src/model/captchaCode.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const mongoose = __webpack_require__(/*! mongoose */ "mongoose");
const captchaCodeSchema = new mongoose.Schema({
  Num: String,
  expiresTime: {
    type: Date,
    expires: "5m",
    default: Date.now
  }
});
//만료 시간을 5분으로 설정했습니다.
const captchaCode = mongoose.model("captchaCode", captchaCodeSchema);
captchaCode.collection.createIndex({
  expiresTime: 1
}, {
  expireAfterSeconds: 0
});
//인덱스 설정을 통해 정해진 시간이 지나면 삭제되도록 합니다.

module.exports = captchaCode;

/***/ }),

/***/ "./src/model/chatLog.js":
/*!******************************!*\
  !*** ./src/model/chatLog.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const mongoose = __webpack_require__(/*! mongoose */ "mongoose");

//rooms id time message

const ChatLogSchema = new mongoose.Schema({
  date: Date,
  roomName: String,
  id: String,
  //소켓 아이디나 회원 아이디.
  message: String,
  expiresTime: {
    type: Date,
    expires: "24h",
    // 24시간 후에 문서가 만료되도록 설정
    default: () => Date.now() + 24 * 60 * 60 * 1000 // 현재 시간에 24시간을 더한 시간을 기본값으로 설정
  }
});
//변수명               모델 이름 스키마이름
const chatLog = mongoose.model("ChatLog", ChatLogSchema);
// chatLog.collection.createIndex({ expiresTime: 1 }, { expireAfterSeconds: 0 });

module.exports = chatLog;

/***/ }),

/***/ "./src/model/hasitem.js":
/*!******************************!*\
  !*** ./src/model/hasitem.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const mongoose = __webpack_require__(/*! mongoose */ "mongoose");
const HasItemSchema = new mongoose.Schema({
  _id: {
    type: [String]
  },
  grade: {
    type: [String]
  },
  forwho: {
    type: [String]
  },
  category: {
    type: [String]
  },
  stat: {
    type: Object,
    default: {}
  },
  skill: {
    type: Object,
    default: {}
  },
  panalty: {
    type: Object,
    default: {}
  },
  location: {
    type: [String]
  }
});
const HasItemListsSchema = new mongoose.Schema({
  ID: String,
  Item: [HasItemSchema]
});
const HasItem = mongoose.model("HasItem", HasItemListsSchema);
module.exports = HasItem;

/***/ }),

/***/ "./src/model/item.js":
/*!***************************!*\
  !*** ./src/model/item.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const mongoose = __webpack_require__(/*! mongoose */ "mongoose");
const ItemSchema = new mongoose.Schema({
  Id: Number,
  Category: String,
  Name: String,
  Grade: String,
  Icon: String,
  BundleCount: Number,
  TradeRemainCount: Number,
  YDayAvgPrice: Number,
  RecentPrice: Number,
  CurrentMinPrice: Number,
  Quantity: Number,
  Quantity2: Number
}, {
  _id: false
}); // _id 필드 사용 안 함
const ContentListsSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: false
  },
  Title: String,
  List: [ItemSchema],
  Category: String,
  ID: {
    type: String,
    required: false
  }
});
const MarketItem = mongoose.model("MarketItem", ContentListsSchema);
module.exports = MarketItem;

/***/ }),

/***/ "./src/model/market.js":
/*!*****************************!*\
  !*** ./src/model/market.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

//market.js

const mongoose = __webpack_require__(/*! mongoose */ "mongoose");
const marketListSchema = new mongoose.Schema({
  Id: Number,
  Category: String,
  Name: String,
  Grade: String,
  Icon: String,
  BundleCount: Number,
  TradeRemainCount: Number,
  // 또는 null 허용하려면 { type: Number, default: null }로 설정
  YDayAvgPrice: Number,
  RecentPrice: Number,
  CurrentMinPrice: Number
});
const marketList = mongoose.model("Item", marketListSchema);
module.exports = marketList;

/***/ }),

/***/ "./src/model/report.js":
/*!*****************************!*\
  !*** ./src/model/report.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const mongoose = __webpack_require__(/*! mongoose */ "mongoose");
const ReportSchema = new mongoose.Schema({
  Title: String,
  Body: String
});
const Report = mongoose.model("Report", ReportSchema);
module.exports = Report;

/***/ }),

/***/ "./src/model/text.js":
/*!***************************!*\
  !*** ./src/model/text.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const mongoose = __webpack_require__(/*! mongoose */ "mongoose");
const TextSchema = new mongoose.Schema({
  TextTitle: {
    type: String,
    required: false,
    maxlength: 90
  },
  TextBody: {
    type: String,
    required: false,
    maxlength: 1500
  },
  Category: String,
  Category2: String,
  _id: String,
  ID: {
    type: String,
    required: false,
    maxlength: 60
  },
  Date: Date,
  FakeID: {
    type: String,
    required: false,
    maxlength: 60
  },
  FakePassWord: {
    type: String,
    required: false,
    maxlength: 60
  }
});
const Text = mongoose.model("Text", TextSchema);
module.exports = Text;

/***/ }),

/***/ "./src/model/trading_data.js":
/*!***********************************!*\
  !*** ./src/model/trading_data.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const mongoose = __webpack_require__(/*! mongoose */ "mongoose");
const Schema = mongoose.Schema;

// '파괴석 조각' 컬렉션의 스키마 정의
const trading_dataSchema = new Schema({
  Category: {
    type: String
    // required: true,
  },
  Name: {
    type: String
    // required: true,
  },
  TradeRemainCount: {
    type: Number,
    default: null // TradeRemainCount가 주어지지 않은 경우 기본값으로 null 설정
  },
  BundleCount: {
    type: Number
    // required: true,
  },
  Stats: {
    type: [Object] // Stats는 객체의 배열로 구성된다고 가정합니다.
  }
});

// '파괴석 조각' 컬렉션을 생성
const trading_data = mongoose.model("trading_data", trading_dataSchema);
module.exports = trading_data;

/***/ }),

/***/ "./src/model/user.js":
/*!***************************!*\
  !*** ./src/model/user.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const mongoose = __webpack_require__(/*! mongoose */ "mongoose");
const UserSchema = new mongoose.Schema({
  ID: {
    type: String,
    maxlength: 60
  },
  Password: {
    type: String,
    maxlength: 60
  },
  Question: {
    type: String,
    maxlength: 60
  },
  Answer: {
    type: String,
    maxlength: 60
  },
  Role: String
});
const User = mongoose.model("User", UserSchema);
module.exports = User;

/***/ }),

/***/ "./src/model/visited.js":
/*!******************************!*\
  !*** ./src/model/visited.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const mongoose = __webpack_require__(/*! mongoose */ "mongoose");
const visitedSchema = new mongoose.Schema({
  Date: String,
  todayTotal: {
    type: Number,
    default: 0
  }
});
const Visited = mongoose.model("visited", visitedSchema);
module.exports = Visited;

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("axios");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("body-parser");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("cookie-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("cors");

/***/ }),

/***/ "debug":
/*!************************!*\
  !*** external "debug" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("debug");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("morgan");

/***/ }),

/***/ "nunjucks":
/*!***************************!*\
  !*** external "nunjucks" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("nunjucks");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("passport");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("passport-jwt");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("socket.io");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("winston");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************!*\
  !*** ./app.js ***!
  \****************/
//server.js
const express = __webpack_require__(/*! express */ "express");
const cors = __webpack_require__(/*! cors */ "cors");
const app = express();
const {
  createServer
} = __webpack_require__(/*! http */ "http");
const {
  Server
} = __webpack_require__(/*! socket.io */ "socket.io");
var port = normalizePort(process.env.PORT || "3001");
app.set("port", port);
var debug = __webpack_require__(/*! debug */ "debug")("myapp:server");
// var http = require("http");
// var server = http.createServer(app);
var httpServer = createServer(app);
httpServer.on("error", onError);
httpServer.on("listening", onListening);
const mongoose = __webpack_require__(/*! mongoose */ "mongoose");
const marketList = __webpack_require__(/*! ./src/model/market */ "./src/model/market.js");
const chatLog = __webpack_require__(/*! ./src/model/chatLog */ "./src/model/chatLog.js");
const MarketItem = __webpack_require__(/*! ./src/model/item */ "./src/model/item.js");
const Text = __webpack_require__(/*! ./src/model/text */ "./src/model/text.js");
const User = __webpack_require__(/*! ./src/model/user */ "./src/model/user.js");
const Report = __webpack_require__(/*! ./src/model/report */ "./src/model/report.js");
const hasitem = __webpack_require__(/*! ./src/model/hasitem */ "./src/model/hasitem.js");
const trading_data = __webpack_require__(/*! ./src/model/trading_data */ "./src/model/trading_data.js");
const captchaCode = __webpack_require__(/*! ./src/model/captchaCode */ "./src/model/captchaCode.js");
const Visited = __webpack_require__(/*! ./src/model/visited */ "./src/model/visited.js");
(__webpack_require__(/*! dotenv */ "dotenv").config)();
const passport = __webpack_require__(/*! passport */ "passport");
const passportJWT = __webpack_require__(/*! passport-jwt */ "passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
const winston = __webpack_require__(/*! winston */ "winston");
var cookieParser = __webpack_require__(/*! cookie-parser */ "cookie-parser");
var logger = __webpack_require__(/*! morgan */ "morgan");
const nunjucks = __webpack_require__(/*! nunjucks */ "nunjucks");
const path = __webpack_require__(/*! path */ "path");
const bodyParser = __webpack_require__(/*! body-parser */ "body-parser");
const axios = __webpack_require__(/*! axios */ "axios");
const fetchDataAndUpdate = __webpack_require__(/*! ./src/controllers/update */ "./src/controllers/update.js");
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(passport.initialize());
app.use(logger(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]'));
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:3000", "https://www.nextriceark.site", "https://nextriceark-jnwk-git-main-nakkis-projects.vercel.app", "https://nextriceark-jnwk-46nic2wxb-nakkis-projects.vercel.app", "https://nextriceark-jnwk.vercel.app", "https://developer-lostark.game.onstove.com"],
  credentials: true
}));
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ttcs9nu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`).then(() => {
  console.log("MONGO CONNECTION OPEN!!!");
}).catch(err => {
  console.log("OH NO MONGO CONNECTION ERROR!!!!");
  console.log(err);
});
function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}
function onListening() {
  var addr = httpServer.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY
};
const strategy = new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
  try {
    const existingUser = await User.findOne({
      ID: jwt_payload.ID
    });
    if (existingUser) {
      return done(null, existingUser);
    } else {
      return done(null, false);
    }
  } catch (error) {
    console.error("serError updating data:", error);
    res.status(500).json({
      error: "serInternal server error"
    });
  }
});
passport.use(strategy);
// 미들웨어: 쿠키 검증 및 사용자 인증
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Authentication failed"
    });
  }
  jwt.verify(token, jwtOptions.secretOrKey, (err, user) => {
    if (err) {
      // 토큰 검증 실패 시
      return res.status(403).json({
        message: "Invalid token"
      });
    }
    req.user = user; // 검증된 사용자 정보를 요청 객체에 저장
    next();
  });
};
function checkAdminRole(req, res, next) {
  const token = req.headers.authorization;
  const realtoken = token.split(" ")[1];
  try {
    if (!token) {
      return res.status(401).json({
        message: "No token provided."
      });
    }
    jwt.verify(realtoken, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        // return console.log(res);;
        //   return res.status(403).json({ message: 'serInvalid token.' });
        // }
        console.error("JWT verification error:", err);
        return res.status(403).json({
          message: "Invalid token."
        });
      }
      if (decoded.Role === "admin") {
        // 사용자 역할이 'admin'인 경우에만 다음 미들웨어 또는 라우트로 이동
        next();
      } else {
        return res.status(403).json({
          message: "Access denied: Not an admin."
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error"
    });
  }
}
app.get("/api/touch", async (req, res) => {
  const randomNum = Math.floor(Math.random() * 10000);
  const formattedNum = String(randomNum).padStart(4, "0");
  const insertResult = await captchaCode.insertMany({
    Num: formattedNum
  });
  res.send(insertResult[0].Num);
});
app.get("/", (req, res) => {
  const currentTime = new Date().toLocaleTimeString();
  res.send(`현재 시간: ${currentTime}`);
});
const socketCorsOrigin =  true ? "https://www.nextriceark.site" : 0;
const io = new Server(httpServer, {
  cors: {
    origin: socketCorsOrigin,
    credentials: true
  }
});
const connectedClients = {};
app.get("/api/SocketID", async (req, res) => {
  const data = Object.keys(connectedClients);
  res.send(data);
});
app.post("/api/RoomList", async (req, res) => {
  let roomList = [];
  let {
    id
  } = req.body;
  for (let key of io.sockets.adapter.rooms.keys()) {
    roomList.push(key);
  }
  const data = roomList.filter(element => {
    return element.split("___").includes(id) && element.split("___").length > 1;
  });
  res.send(data);
});
io.on("connection", socket => {
  console.log(`Client connected ${socket.id}`);
  connectedClients[socket.id] = socket;
  socket.on("join", roomName => {
    if (io.sockets.adapter.rooms.get(roomName) != undefined) {
      !io.sockets.adapter.rooms.get(roomName).has(socket.id) && socket.join(roomName);
    }
  });
  socket.on("chat", chatdata => {
    !io.sockets.adapter.rooms.has(chatdata.roomName) && socket.join(chatdata.roomName);
    //확인된 오류 이미 조인된 상태에서 같은 생대를 클릭해서 대화 생성시 받는건되는데 주는건 안됨.- 오락가락함
    chatLog.insertMany(chatdata);
    console.log(`Message from ${chatdata.roomName} ${socket.id}: ${chatdata.message}`);
    let data = {
      userId: socket.id === chatdata.id ? chatdata.id : null,
      content: chatdata.message,
      roomName: chatdata.roomName,
      date: new Date()
    };
    socket.emit("chat2", data);
    let idSet = new Set(chatdata.roomName.split("___"));
    idSet.forEach(element => {
      socket.to(element).emit("chat2", data);
    });
  });
  socket.on("leaveRoom", currentRoomName => {
    let data = {
      userId: `system`,
      content: `${socket.id}가 나갔습니다.`,
      roomName: currentRoomName
    };
    let idSet = new Set(currentRoomName.split("___").filter(e => {
      return socket.id != e;
    }));
    idSet.forEach(element => {
      socket.to(element).emit("chat2", data);
    });
    if (io.sockets.adapter.rooms.has(currentRoomName)) {
      const clients = io.sockets.adapter.rooms.get(currentRoomName);
      if (clients) {
        clients.forEach(clientId => {
          io.sockets.sockets.get(clientId).leave(currentRoomName);
        });
      }
    }
    io.sockets.adapter.del(currentRoomName);
  });
  socket.on("disconnect", roomName => {
    console.log("Client disconnected: " + socket.id);
    let roomList = Array.from(io.sockets.adapter.rooms).map(room => {
      return room[0];
    });
    for (let currentRoomName of roomList) {
      let data = {
        userId: `system`,
        content: `${socket.id}가 나갔습니다. 잠시후 방이 사라집니다.`,
        roomName: currentRoomName
      };
      let idSet = new Set(currentRoomName.split("___").filter(e => {
        return socket.id != e;
      }));
      idSet.forEach(element => {
        socket.to(element).emit("chat2", data);
      });
      if (io.sockets.adapter.rooms.has(currentRoomName)) {
        const clients = io.sockets.adapter.rooms.get(currentRoomName);
        if (clients) {
          clients.forEach(clientId => {
            io.sockets.sockets.get(clientId).leave(currentRoomName);
          });
        }
      }
      io.sockets.adapter.del(currentRoomName);
    }
    delete connectedClients[socket.id];
  });
});
app.get("/api/VisitorCount", async (req, res) => {
  let totalVistor = 0;
  const result = await Visited.aggregate([{
    $group: {
      _id: null,
      total: {
        $sum: "$todayTotal"
      }
    }
  }]);
  if (result.length > 0) {
    totalVistor = result[0].total + 1;
  } else {
    console.log("데이터가 없습니다.");
  }
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // 월을 두 자리로 표시
  const day = String(currentDate.getDate()).padStart(2, "0"); // 일을 두 자리로 표시
  const formattedDate = `${year}-${month}-${day}`;
  const [todayVisitor] = await Visited.find({
    Date: formattedDate
  });
  if (todayVisitor === undefined) {
    await Visited.insertMany({
      Date: formattedDate
    });
  }
  await Visited.updateOne({
    Date: formattedDate
  }, {
    $inc: {
      todayTotal: 1
    }
  });
  const VisitorData = {
    Total: totalVistor,
    Today: todayVisitor.todayTotal
  };
  res.json(VisitorData);
});
app.get("/api/captchaCode", async (req, res) => {
  try {
    const randomNum = Math.floor(Math.random() * 10000);
    const formattedNum = String(randomNum).padStart(4, "0");
    const [insertedResult] = await captchaCode.insertMany({
      Num: formattedNum
    });
    res.send(insertedResult.Num);
  } catch (error) {
    console.error("Error generating captcha code:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});
app.delete("/api/captchaCode", async (req, res) => {
  const data = req.query;
  try {
    await captchaCode.deleteMany({
      Num: data.captchaCode
    });
    res.status(201).json({
      message: "Data updated successfully"
    });
  } catch (error) {
    console.error("Error generating captcha code:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});
app.get("/api/data", async (req, res) => {
  const marketLists = await marketList.find({});
  res.json(marketLists);
});
app.get("/api/load", async (req, res) => {
  const MarketItems = await MarketItem.find({});
  res.json(MarketItems);
});
app.get("/api/trade", async (req, res) => {
  const MarketItems = await trading_data.find({});
  res.json(MarketItems);
});
app.get("/api/loadreport", async (req, res) => {
  const Reports = await Report.find({});
  res.json(Reports);
});
app.post("/api/Login", async (req, res) => {
  const {
    ID,
    Password
  } = req.body;
  const user = await User.findOne({
    ID: ID,
    Password: Password
  });
  if (user) {
    const payload = {
      ID: user.ID,
      Role: user.Role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60
    };
    const token = jwt.sign(payload, jwtOptions.secretOrKey);
    const expirationDate = new Date(); // 수정된 부분
    expirationDate.setDate(expirationDate.getDate() + 1);
    res.cookie("token", token, {
      expires: expirationDate,
      sameSite: "None",
      secure: true,
      httpOnly: true
    });
    res.json({
      token
    });
  } else {
    res.status(401).json({
      message: "Authentication failed"
    });
  }
});
app.post("/api/check", async (req, res) => {
  const user = req.body;
  try {
    const existingUser = await User.findOne({
      ID: user.Item.ID
    });
    if (!existingUser) {
      res.json(false);
    } else {
      res.json(true);
    }
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});
app.post("/api/signup", async (req, res) => {
  const user = req.body;
  const existingpass2 = await captchaCode.deleteMany({
    Num: user.Pass
  });
  if (existingpass2.deletedCount > 0) {
    try {
      const existingUser = await User.findOne({
        ID: user.Item.ID
      });
      if (!existingUser) {
        if (user.Item.ID === "adminim") {
          user.Item.Role = "admin";
        } else {
          user.Item.Role = "user";
        }
        const newUser = await User.insertMany(user.Item);
        console.log(newUser);
        res.status(201).json({
          message: "Data updated successfully"
        });
      } else {
        res.status(409).json({
          error: "User with this ID already exists"
        });
      }
    } catch (error) {
      console.error("Error updating data:", error);
      res.status(500).json({
        error: "Internal server error"
      });
    }
  }
});
app.post("/api/forget", async (req, res) => {
  const user = req.body;
  try {
    const existingUser = await User.findOne({
      ID: user.Item.ID
    });
    if (existingUser) {
      res.json(existingUser.Question);
    } else {
      res.status(409).json({
        error: "User with this ID already exists"
      });
    }
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});
app.post("/api/forget2", async (req, res) => {
  const user = req.body;
  try {
    const existingUser = await User.findOne({
      ID: user.Item.ID,
      Question: user.Item.Question,
      Answer: user.Item.Answer
    });
    if (existingUser) {
      res.json(existingUser.Password);
    } else {
      res.status(409).json({
        error: "User with this ID already exists"
      });
    }
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});
app.post("/api/delete1", async (req, res) => {
  const list = req.body;
  const token = req.headers.authorization;
  const realtoken = token.split(" ")[1];
  const decoded = jwt.verify(realtoken, process.env.JWT_KEY);
  if (decoded.ID === list.Item.ID) {
    try {
      const result = await MarketItem.deleteOne({
        _id: list.Item._id
      });
      if (result.deletedCount === 1) {
        console.log("Document deleted successfully");
        res.status(200).json("True");
      } else {
        console.log("Document not found");
        res.status(404).json({
          message: "Document not found"
        });
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      res.status(500).json({
        error: "Internal server error"
      });
    }
  }
});
app.post("/api/report", async (req, res) => {
  const lists = req.body;
  const existingpass = await captchaCode.find({
    Num: lists.Pass
  });
  if (existingpass.length > 0) {
    await captchaCode.deleteMany({
      Num: lists.Pass
    });
    try {
      console.log(lists.Item);
      await Report.insertMany(lists.Item);
      res.status(200).json({
        message: "Data updated successfully"
      });
      console.log(lists);
    } catch (error) {
      console.error("Error updating data:", error);
      res.status(500).json({
        error: "Internal server error"
      });
    }
  }
});
app.post("/api/reportdel", checkAdminRole, async (req, res) => {
  const lists = req.body;
  console.log(lists);
  try {
    await Report.deleteOne({
      Title: lists.Title,
      Body: lists.Body
    });
    res.status(200).json("True");
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});
app.post("/api/update", async (req, res) => {
  const {
    lists
  } = req.body;
  try {
    await MarketItem.deleteMany();
    await MarketItem.insertMany(lists.lists.map(item => item));
    res.status(200).json({
      message: "Data updated successfully"
    });
    console.log(lists);
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});
app.post("/api/list", async (req, res) => {
  const list = req.body;
  const existingCaptchaCode = await captchaCode.find({
    Num: list.captchaCode
  });
  if (existingCaptchaCode.length > 0) {
    await captchaCode.deleteMany({
      Num: list.captchaCode
    });
    try {
      const insertResult = await MarketItem.insertMany(list.Item);
      console.log(insertResult);
      res.json({
        message: "Data updated successfully"
      });
    } catch (error) {
      console.error("Error updating data:", error);
      res.status(500).json({
        error: "Internal server error"
      });
    }
  }
});
app.get("/api/Board/check", async (req, res) => {
  const data = req.query;
  const query = {
    _id: data._id
  };
  if (data.ID === "adminim") {} else {
    query.FakePassWord = data.InputFakePassWord;
  }
  const existingText = await Text.find(query);
  if (existingText.length > 0) {
    res.json(true);
  } else {
    res.json(false);
  }
});
app.get("/api/Board", async (req, res) => {
  try {
    const TextList = await Text.find({}, {
      FakePassWord: 0
    });
    res.json(TextList);
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});
app.post("/api/Board", async (req, res) => {
  const existingCaptchaCode = await captchaCode.find({
    Num: req.body.CaptchaCode
  });
  if (existingCaptchaCode.length > 0) {
    await captchaCode.deleteMany({
      Num: req.body.CaptchaCode
    });
    try {
      const insertResult = await Text.insertMany(req.body.Text);
      res.json({
        message: "Data updated successfully"
      });
    } catch (error) {
      console.error("Error updating data:", error);
      res.status(500).json({
        error: "Internal server error"
      });
    }
  }
});
app.delete("/api/Board", async (req, res) => {
  const data = req.query;
  const query = {
    _id: data._id
  };
  if (data.InputFakePassWord !== "undefined") {
    query.FakePassWord = data.InputFakePassWord;
  } else {
    if (data.ID === "adminim") {} else {
      query.ID = data.ID;
    }
  }
  try {
    const existingText = await Text.deleteMany(query);
    if (existingText.length > 0) {
      res.json({
        message: "Data deleted successfully"
      });
    } else {
      res.json(false);
    }
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});
app.patch("/api/Board", async (req, res) => {
  const data = req.body;
  const {
    _id,
    TextTitle,
    TextBody,
    Category,
    Category2,
    ID
  } = data;
  try {
    await Text.findByIdAndUpdate(_id, {
      $set: {
        TextTitle,
        TextBody,
        Category
      }
    });
    res.json({
      message: "Data updated successfully"
    });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});
app.post("/api/update3", async (req, res) => {
  const list = req.body;
  console.log(list);
  try {
    const deleteedResult = await hasitem.deleteMany({
      ID: list.ID
    });
    const insertResult = await hasitem.insertMany(list);
    console.log(insertResult);
    res.status(200).json({
      message: "Data updated successfully"
    });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});
app.post("/api/hasitemload", async (req, res) => {
  const list = req.body;
  console.log(list);
  try {
    const insertResult = await hasitem.find({
      ID: list.ID
    });
    res.json(insertResult);
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});
app.post("/api/update2", async (req, res) => {
  const list = req.body;
  const token = req.headers.authorization;
  const realtoken = token.split(" ")[1];
  const decoded = jwt.verify(realtoken, process.env.JWT_KEY);
  if (decoded.ID === list.Item.ID) {
    try {
      const insertResult = await MarketItem.updateOne({
        _id: list.Item._id
      }, {
        $set: {
          Title: list.Item.Title,
          List: list.Item.List,
          Category: list.Item.Category
        }
      });
      res.status(200).json({
        message: "Data updated successfully"
      });
    } catch (error) {
      console.error("Error updating data:", error);
      res.status(500).json({
        error: "Internal server error"
      });
    }
  }
});
async function getMarketData() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  const [todayVisitor] = await Visited.find({
    Date: formattedDate
  });
  if (todayVisitor === undefined) {
    await Visited.insertMany({
      Date: formattedDate
    });
  }
  fetchDataAndUpdate();
}
getMarketData();
const now = new Date();
const tomorrow = new Date(now);
tomorrow.setDate(now.getDate() + 1);
tomorrow.setHours(1, 0, 0);
const interval = 24 * 60 * 60 * 1000; // 24시간
setInterval(getMarketData, interval);
httpServer.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
})();

/******/ })()
;
//# sourceMappingURL=server.js.map