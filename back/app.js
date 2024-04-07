//server.js
const express = require("express");
const cors = require("cors");
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
var port = normalizePort(process.env.PORT || "3001");
app.set("port", port);
var debug = require("debug")("myapp:server");
// var http = require("http");
// var server = http.createServer(app);
var httpServer = createServer(app);
httpServer.on("error", onError);
httpServer.on("listening", onListening);
const mongoose = require("mongoose");
const marketList = require("./src/model/market");
const chatLog = require("./src/model/chatLog");
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

app.use((req, res) => {
  // 클라우드 플레어를 통해 전달된 클라이언트의 실제 IP 주소 확인
  const clientIP =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  req.clientIP = clientIP;
});

app.use(
  logger(
    ':clientIP [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]'
  )
);
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
console.log("test");
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
  const randomNum = Math.floor(Math.random() * 10000);
  const formattedNum = String(randomNum).padStart(4, "0");
  const insertResult = await captchaCode.insertMany({ Num: formattedNum });
  res.send(insertResult[0].Num);
});

app.get("/", (req, res) => {
  const currentTime = new Date().toLocaleTimeString();
  res.send(`현재 시간: ${currentTime}`);
});
const socketCorsOrigin = process.env.NODE_ENV
  ? "https://www.nextriceark.site"
  : `http://localhost:3000`;
const io = new Server(httpServer, {
  cors: {
    origin: socketCorsOrigin,
    credentials: true,
  },
});
const connectedClients = {};
app.get("/api/SocketID", async (req, res) => {
  const data = Object.keys(connectedClients);
  res.send(data);
});
app.post("/api/RoomList", async (req, res) => {
  let roomList = [];
  let { id } = req.body;

  for (let key of io.sockets.adapter.rooms.keys()) {
    roomList.push(key);
  }
  const data = roomList.filter((element) => {
    return element.split("___").includes(id) && element.split("___").length > 1;
  });
  res.send(data);
});
io.on("connection", (socket) => {
  console.log(`Client connected ${socket.id}`);
  connectedClients[socket.id] = socket;
  socket.on("join", (roomName) => {
    if (io.sockets.adapter.rooms.get(roomName) != undefined) {
      !io.sockets.adapter.rooms.get(roomName).has(socket.id) &&
        socket.join(roomName);
    }
  });
  socket.on("chat", (chatdata) => {
    !io.sockets.adapter.rooms.has(chatdata.roomName) &&
      socket.join(chatdata.roomName);
    //확인된 오류 이미 조인된 상태에서 같은 생대를 클릭해서 대화 생성시 받는건되는데 주는건 안됨.- 오락가락함
    chatLog.insertMany(chatdata);
    console.log(
      `Message from ${chatdata.roomName} ${socket.id}: ${chatdata.message}`
    );
    let data = {
      userId: socket.id === chatdata.id ? chatdata.id : null,
      content: chatdata.message,
      roomName: chatdata.roomName,
      date: new Date(),
    };
    socket.emit("chat2", data);
    let idSet = new Set(chatdata.roomName.split("___"));
    idSet.forEach((element) => {
      socket.to(element).emit("chat2", data);
    });
  });

  socket.on("leaveRoom", (currentRoomName) => {
    let data = {
      userId: `system`,
      content: `${socket.id}가 나갔습니다.`,
      roomName: currentRoomName,
    };
    let idSet = new Set(
      currentRoomName.split("___").filter((e) => {
        return socket.id != e;
      })
    );
    idSet.forEach((element) => {
      socket.to(element).emit("chat2", data);
    });
    if (io.sockets.adapter.rooms.has(currentRoomName)) {
      const clients = io.sockets.adapter.rooms.get(currentRoomName);
      if (clients) {
        clients.forEach((clientId) => {
          io.sockets.sockets.get(clientId).leave(currentRoomName);
        });
      }
    }
    io.sockets.adapter.del(currentRoomName);
  });
  socket.on("disconnect", (roomName) => {
    console.log("Client disconnected: " + socket.id);
    let roomList = Array.from(io.sockets.adapter.rooms).map((room) => {
      return room[0];
    });
    for (let currentRoomName of roomList) {
      let data = {
        userId: `system`,
        content: `${socket.id}가 나갔습니다. 잠시후 방이 사라집니다.`,
        roomName: currentRoomName,
      };
      let idSet = new Set(
        currentRoomName.split("___").filter((e) => {
          return socket.id != e;
        })
      );
      idSet.forEach((element) => {
        socket.to(element).emit("chat2", data);
      });
      if (io.sockets.adapter.rooms.has(currentRoomName)) {
        const clients = io.sockets.adapter.rooms.get(currentRoomName);
        if (clients) {
          clients.forEach((clientId) => {
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
  const [checkVisitor] = await Visited.find({ Date: formattedDate });
  if (checkVisitor === undefined) {
    await Visited.insertMany({ Date: formattedDate });
  }

  await Visited.updateOne({ Date: formattedDate }, { $inc: { todayTotal: 1 } });
  const [todayVisitor] = await Visited.find({ Date: formattedDate });
  const VisitorData = {
    Total: totalVistor,
    Today: todayVisitor.todayTotal,
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
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
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
  const user = req.body;
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
  const user = req.body;

  const existingpass2 = await captchaCode.deleteMany({ Num: user.Pass });
  if (existingpass2.deletedCount > 0) {
    try {
      const existingUser = await User.findOne({ ID: user.Item.ID });
      if (!existingUser) {
        if (user.Item.ID === "adminim") {
          user.Item.Role = "admin";
        } else {
          user.Item.Role = "user";
        }

        const newUser = await User.insertMany(user.Item);
        console.log(newUser);
        res.status(201).json({ message: "Data updated successfully" });
      } else {
        res.status(409).json({ error: "User with this ID already exists" });
      }
    } catch (error) {
      console.error("Error updating data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});
app.post("/api/forget", async (req, res) => {
  const user = req.body;
  try {
    const existingUser = await User.findOne({ ID: user.Item.ID });
    if (existingUser) {
      res.json(existingUser.Question);
    } else {
      res.status(409).json({ error: "User with this ID already exists" });
    }
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/api/forget2", async (req, res) => {
  const user = req.body;
  try {
    const existingUser = await User.findOne({
      ID: user.Item.ID,
      Question: user.Item.Question,
      Answer: user.Item.Answer,
    });
    if (existingUser) {
      res.json(existingUser.Password);
    } else {
      res.status(409).json({ error: "User with this ID already exists" });
    }
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/api/delete1", async (req, res) => {
  const list = req.body;
  const token = req.headers.authorization;
  const realtoken = token.split(" ")[1];
  const decoded = jwt.verify(realtoken, process.env.JWT_KEY);
  if (decoded.ID === list.Item.ID) {
    try {
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
  const lists = req.body;
  const existingpass = await captchaCode.find({ Num: lists.Pass });
  if (existingpass.length > 0) {
    await captchaCode.deleteMany({ Num: lists.Pass });
    try {
      console.log(lists.Item);
      await Report.insertMany(lists.Item);
      res.status(200).json({ message: "Data updated successfully" });
      console.log(lists);
    } catch (error) {
      console.error("Error updating data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

app.post("/api/reportdel", checkAdminRole, async (req, res) => {
  const lists = req.body;
  console.log(lists);

  try {
    await Report.deleteOne({ Title: lists.Title, Body: lists.Body });
    res.status(200).json("True");
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/update", async (req, res) => {
  const { lists } = req.body;
  try {
    await MarketItem.deleteMany();
    await MarketItem.insertMany(lists.lists.map((item) => item));
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

app.get("/api/Board/check", async (req, res) => {
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
});

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
  const list = req.body;
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
  const list = req.body;
  console.log(list);
  try {
    const insertResult = await hasitem.find({ ID: list.ID });
    res.json(insertResult);
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/api/update2", async (req, res) => {
  const list = req.body;
  const token = req.headers.authorization;
  const realtoken = token.split(" ")[1];
  const decoded = jwt.verify(realtoken, process.env.JWT_KEY);
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
      res.status(200).json({ message: "Data updated successfully" });
    } catch (error) {
      console.error("Error updating data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});
async function getMarketData() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  const [todayVisitor] = await Visited.find({ Date: formattedDate });
  if (todayVisitor === undefined) {
    await Visited.insertMany({ Date: formattedDate });
  }
  fetchDataAndUpdate();
}
getMarketData();
const interval = 24 * 60 * 60 * 1000; // 24시간
setInterval(getMarketData, interval);
httpServer.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
