//server.js
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const marketList = require("./src/model/market");
const MarketItem = require("./src/model/item");
const Text = require("./src/model/text");
const User = require("./src/model/user");
const Report = require("./src/model/report");
const hasitem = require("./src/model/hasitem");
const trading_data = require("./src/model/trading_data");
const captchaCode = require("./src/model/captchaCode");
const Visited = require("./src/model/visited");
require("dotenv").config();
const passport = require("passport");
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const jwt = require("jsonwebtoken");
const winston = require("winston");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const nunjucks = require("nunjucks");
const path = require("path");
const bodyParser = require("body-parser");
const axios = require("axios");
const fetchDataAndUpdate = require("./src/controllers/update");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(passport.initialize());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://www.nextriceark.site",
      "https://nextriceark-jnwk-git-main-nakkis-projects.vercel.app",
      "https://nextriceark-jnwk-46nic2wxb-nakkis-projects.vercel.app",
      "https://nextriceark-jnwk.vercel.app",
      "https://developer-lostark.game.onstove.com",
    ],
    credentials: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ttcs9nu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });
//책에선 싱글톤 패턴이랬는데 그냥 그런갑다 싶음

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY,
};

const strategy = new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
  try {
    const existingUser = await User.findOne({ ID: jwt_payload.ID });

    if (existingUser) {
      return done(null, existingUser);
    } else {
      return done(null, false);
    }
  } catch (error) {
    console.error("serError updating data:", error);
    res.status(500).json({ error: "serInternal server error" });
  }
});
passport.use(strategy);

// 미들웨어: 쿠키 검증 및 사용자 인증
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  jwt.verify(token, jwtOptions.secretOrKey, (err, user) => {
    if (err) {
      // 토큰 검증 실패 시
      return res.status(403).json({ message: "Invalid token" });
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
      return res.status(401).json({ message: "No token provided." });
    }

    jwt.verify(realtoken, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        // return console.log(res);;
        //   return res.status(403).json({ message: 'serInvalid token.' });
        // }
        console.error("JWT verification error:", err);
        return res.status(403).json({ message: "Invalid token." });
      }

      if (decoded.Role === "admin") {
        // 사용자 역할이 'admin'인 경우에만 다음 미들웨어 또는 라우트로 이동
        next();
      } else {
        return res
          .status(403)
          .json({ message: "Access denied: Not an admin." });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

app.get("/api/touch", async (req, res) => {
  // 0부터 9999까지의 난수 생성
  const randomNum = Math.floor(Math.random() * 10000);
  const formattedNum = String(randomNum).padStart(4, "0");
  const insertResult = await captchaCode.insertMany({ Num: formattedNum });
  // 난수를 4자리 문자열로 변환
  res.send(insertResult[0].Num);
});
console.log(124);

app.get("/", (req, res) => {
  console.log(123);
  res.send("hi");
});

app.get("/api/VisitorCount", async (req, res) => {
  let totalVistor = 0;
  const result = await Visited.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: "$todayTotal" },
      },
    },
  ]);

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
  const todatVisitor = await Visited.find({ Date: formattedDate });

  await Visited.updateOne({ Date: formattedDate }, { $inc: { todayTotal: 1 } });
  const VisitorData = {
    Total: totalVistor,
    Today: todatVisitor[0].todayTotal,
  };

  res.json(VisitorData);
});

app.get("/api/captchaCode", async (req, res) => {
  try {
    const randomNum = Math.floor(Math.random() * 10000);
    const formattedNum = String(randomNum).padStart(4, "0");
    const [insertedResult] = await captchaCode.insertMany({
      Num: formattedNum,
    });
    res.send(insertedResult.Num);
  } catch (error) {
    console.error("Error generating captcha code:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
//임의의 수를 생성해서 DB에 저장하고 결과 값을 보냅니다.

app.delete("/api/captchaCode", async (req, res) => {
  const data = req.query;

  try {
    await captchaCode.deleteMany({
      Num: data.captchaCode,
    });
    res.status(201).json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error generating captcha code:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
//임의의 수를 생성해서 DB에 저장하고 결과 값을 보냅니다.

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
  const { ID, Password } = req.body;
  const user = await User.findOne({ ID: ID, Password: Password });

  if (user) {
    const payload = {
      ID: user.ID,
      Role: user.Role,
      iat: Math.floor(Date.now() / 1000), // 토큰 발행 시간 (Unix 타임스탬프)
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1시간 후 만료
    };
    const token = jwt.sign(payload, jwtOptions.secretOrKey);
    const expirationDate = new Date(); // 수정된 부분
    expirationDate.setDate(expirationDate.getDate() + 1);
    res.cookie("token", token, {
      expires: expirationDate,
      sameSite: "None",
      secure: true,
      httpOnly: true,
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Authentication failed" });
  }
});

app.post("/api/check", async (req, res) => {
  const user = req.body; // 클라이언트에서 보낸 사용자 데이터
  try {
    const existingUser = await User.findOne({ ID: user.Item.ID });
    if (!existingUser) {
      res.json(false);
    } else {
      res.json(true);
    }
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/signup", async (req, res) => {
  const user = req.body; // 클라이언트에서 보낸 사용자 데이터

  // if (captchaCode.findOne({Num:user.Pass})) {
  const existingpass2 = await captchaCode.deleteMany({ Num: user.Pass });
  if (existingpass2.deletedCount > 0) {
    try {
      const existingUser = await User.findOne({ ID: user.Item.ID });
      if (!existingUser) {
        // 동일한 아이디를 가진 사용자가 없는 경우
        if (user.Item.ID === "adminim") {
          user.Item.Role = "admin"; // 특별한 아이디에게 "admin" 권한을 부여
        } else {
          user.Item.Role = "user"; // 일반적인 사용자에게는 "user" 권한을 부여
        }

        const newUser = await User.insertMany(user.Item); // 새로운 데이터 추가
        console.log(newUser);
        res.status(201).json({ message: "Data updated successfully" });
      } else {
        // 이미 동일한 아이디를 가진 사용자가 있는 경우
        res.status(409).json({ error: "User with this ID already exists" });
      }
    } catch (error) {
      console.error("Error updating data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});
app.post("/api/forget", async (req, res) => {
  const user = req.body; // 클라이언트에서 보낸 사용자 데이터
  try {
    const existingUser = await User.findOne({ ID: user.Item.ID });
    if (existingUser) {
      // 동일한 아이디를 가진 사용자가 없는 경우
      res.json(existingUser.Question);
    } else {
      // 이미 동일한 아이디를 가진 사용자가 있는 경우
      res.status(409).json({ error: "User with this ID already exists" });
    }
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/api/forget2", async (req, res) => {
  const user = req.body; // 클라이언트에서 보낸 사용자 데이터
  try {
    const existingUser = await User.findOne({
      ID: user.Item.ID,
      Question: user.Item.Question,
      Answer: user.Item.Answer,
    });
    if (existingUser) {
      // 동일한 아이디를 가진 사용자가 없는 경우
      res.json(existingUser.Password);
    } else {
      // 이미 동일한 아이디를 가진 사용자가 있는 경우
      res.status(409).json({ error: "User with this ID already exists" });
    }
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// passport.authenticate('jwt', { session: false })
app.post("/api/delete1", async (req, res) => {
  const list = req.body; // 클라이언트에서 보낸 Title 데이터
  const token = req.headers.authorization;
  const realtoken = token.split(" ")[1];
  const decoded = jwt.verify(realtoken, process.env.JWT_KEY);
  if (decoded.ID === list.Item.ID) {
    try {
      // MarketItem 컬렉션에서 해당하는 Title 값을 가진 문서 삭제
      const result = await MarketItem.deleteOne({ _id: list.Item._id });

      if (result.deletedCount === 1) {
        console.log("Document deleted successfully");
        res.status(200).json("True");
      } else {
        console.log("Document not found");
        res.status(404).json({ message: "Document not found" });
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

app.post("/api/report", async (req, res) => {
  const lists = req.body; // 클라이언트에서 보낸 lists 데이터
  const existingpass = await captchaCode.find({ Num: lists.Pass });
  if (existingpass.length > 0) {
    await captchaCode.deleteMany({ Num: lists.Pass });
    // if (captchaCode.findOne({ Num: lists.Pass })) {
    // if (passNum.includes(String(lists.Pass))) {
    try {
      console.log(lists.Item);
      // 데이터베이스 업데이트 처리
      // 예시: 데이터 삭제 후 새로운 데이터 추가
      await Report.insertMany(lists.Item); // 새로운 데이터 추가
      //state db구조 손을 봐야할듯...일단은 그냥 고고
      res.status(200).json({ message: "Data updated successfully" });
      console.log(lists);
    } catch (error) {
      console.error("Error updating data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});
// app.post('/api/resources', checkAdminRole, (req, res) => {
//   // 'admin' 역할을 가진 사용자에게만 허용된 작업 수행
//   // ...
// });

app.post("/api/reportdel", checkAdminRole, async (req, res) => {
  const lists = req.body; // 클라이언트에서 보낸 lists 데이터
  console.log(lists);

  // const query = { Title:lists.Title , Body: lists.Body };

  try {
    // 데이터베이스 업데이트 처리
    // 예시: 데이터 삭제 후 새로운 데이터 추가
    await Report.deleteOne({ Title: lists.Title, Body: lists.Body });

    //state db구조 손을 봐야할듯...일단은 그냥 고고
    res.status(200).json("True");
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/update", async (req, res) => {
  const { lists } = req.body; // 클라이언트에서 보낸 lists 데이터

  try {
    // 데이터베이스 업데이트 처리
    // 예시: 데이터 삭제 후 새로운 데이터 추가
    await MarketItem.deleteMany(); // 모든 데이터 삭제
    await MarketItem.insertMany(lists.lists.map((item) => item)); // 새로운 데이터 추가
    //state db구조 손을 봐야할듯...일단은 그냥 고고
    res.status(200).json({ message: "Data updated successfully" });
    console.log(lists);
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/list", async (req, res) => {
  const list = req.body;
  const existingCaptchaCode = await captchaCode.find({ Num: list.captchaCode });
  if (existingCaptchaCode.length > 0) {
    //일치하는 captchaCode코드 값이 없으면 이후 DB입력과정이 진행되지 않습니다.

    await captchaCode.deleteMany({ Num: list.captchaCode });
    try {
      const insertResult = await MarketItem.insertMany(list.Item);
      console.log(insertResult);
      res.json({ message: "Data updated successfully" });
    } catch (error) {
      console.error("Error updating data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

app.get(
  "/api/Board/check",
  async (req, res) => {
    const data = req.query;
    const query = {
      _id: data._id,
    };
    if (data.ID === "adminim") {
    } else {
      query.FakePassWord = data.InputFakePassWord;
    }
    const existingText = await Text.find(query);
    if (existingText.length > 0) {
      res.json(true);
    } else {
      res.json(false);
    }
  }
  // await Text.deleteMany(query);
  // try {
  //   res.json({ message: "Data deleted successfully" });
  // } catch (error) {
  //   console.error("Error updating data:", error);
  //   res.status(500).json({ error: "Internal server error" });
  // }
);

app.get("/api/Board", async (req, res) => {
  try {
    const TextList = await Text.find({}, { FakePassWord: 0 });
    res.json(TextList);
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/Board", async (req, res) => {
  const existingCaptchaCode = await captchaCode.find({
    Num: req.body.CaptchaCode,
  });
  if (existingCaptchaCode.length > 0) {
    //일치하는 captchaCode코드 값이 없으면 이후 DB입력과정이 진행되지 않습니다.

    await captchaCode.deleteMany({ Num: req.body.CaptchaCode });
    try {
      const insertResult = await Text.insertMany(req.body.Text);
      res.json({ message: "Data updated successfully" });
    } catch (error) {
      console.error("Error updating data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

app.delete("/api/Board", async (req, res) => {
  const data = req.query;
  const query = {
    _id: data._id,
  };
  if (data.InputFakePassWord !== "undefined") {
    query.FakePassWord = data.InputFakePassWord;
  } else {
    if (data.ID === "adminim") {
    } else {
      query.ID = data.ID;
    }
  }
  try {
    const existingText = await Text.deleteMany(query);
    if (existingText.length > 0) {
      res.json({ message: "Data deleted successfully" });
    } else {
      res.json(false);
    }
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.patch("/api/Board", async (req, res) => {
  const data = req.body;
  const { _id, TextTitle, TextBody, Category, Category2, ID } = data;
  try {
    await Text.findByIdAndUpdate(_id, {
      $set: { TextTitle, TextBody, Category },
    });
    res.json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/update3", async (req, res) => {
  const list = req.body; // 클라이언트에서 보낸 lists 데이터
  console.log(list);
  try {
    const deleteedResult = await hasitem.deleteMany({ ID: list.ID });
    const insertResult = await hasitem.insertMany(list);
    console.log(insertResult);
    res.status(200).json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/api/hasitemload", async (req, res) => {
  const list = req.body; // 클라이언트에서 보낸 lists 데이터
  console.log(list);
  try {
    const insertResult = await hasitem.find({ ID: list.ID });
    console.log(insertResult);
    // res.send(insertResult);
    res.json(insertResult);
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// const token = req.headers.authorization;
// const realtoken = token.split(" ")[1];
// const decoded = jwt.verify(realtoken, process.env.JWT_KEY);
// const token2 = jwt.sign(decoded, process.env.JWT_KEY);
// 아이디 검증 과정
app.post("/api/update2", async (req, res) => {
  const list = req.body; // 클라이언트에서 보낸 lists 데이터
  const token = req.headers.authorization;
  const realtoken = token.split(" ")[1];
  const decoded = jwt.verify(realtoken, process.env.JWT_KEY);
  // if (passNum.includes(String(list.Pass))) {
  if (decoded.ID === list.Item.ID) {
    try {
      const insertResult = await MarketItem.updateOne(
        { _id: list.Item._id },
        {
          $set: {
            Title: list.Item.Title,
            List: list.Item.List,
            Category: list.Item.Category,
          },
        }
      );
      console.log(insertResult);
      //state db구조 손을 봐야할듯...일단은 그냥 고고
      res.status(200).json({ message: "Data updated successfully" });
    } catch (error) {
      console.error("Error updating data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

app.get("/api/dbdel", async (req, res) => {
  try {
    // 'Body' 속성에 "흐음"을 포함하는 모든 문서 삭제
    // const result = await Report.deleteMany({ Body: /으음/ });
    // const result = await Report.deleteMany({ Body: /으음/ });
    const result = await MarketItem.deleteMany({ Title: { $not: /더보기/ } });

    res.json({ message: `${result.deletedCount} documents deleted` });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

async function myFunction() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // 월을 두 자리로 표시
  const day = String(currentDate.getDate()).padStart(2, "0"); // 일을 두 자리로 표시
  const formattedDate = `${year}-${month}-${day}`;

  // console.log(currentDate);
  // 실행하려는 작업을 이 함수 안에 구현합니다.
  const existingVisited = await Visited.findOne({ Date: formattedDate });
  if (!existingVisited) {
    await Visited.insertMany({ Date: formattedDate, todayTotal: 0 });
    fetchDataAndUpdate();
  }
}
myFunction();
// 함수를 매일 오전 00시에 실행하기 위한 시간 계산
const now = new Date();
const tomorrow = new Date(now);
tomorrow.setDate(now.getDate() + 1);
tomorrow.setHours(1, 0, 0, 0);

// 다음 실행 시각까지 대기하기 위한 시간 계산
const delay = tomorrow - now;

// 함수를 주기적으로 실행하기 위한 Interval 설정
const interval = 24 * 60 * 60 * 1000; // 24시간

// 처음 실행
setTimeout(myFunction, delay);

// 매일 오전 00시마다 함수를 실행하는 Interval 설정
setInterval(function () {
  myFunction();
}, interval);

// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Express server is running on port ${PORT}`);
// });

module.exports = app;
