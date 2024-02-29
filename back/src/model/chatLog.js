const mongoose = require("mongoose");

//rooms id time message

const ChatLogSchema = new mongoose.Schema({
  date: Date,
  roomName: String,
  id: String,
  //소켓 아이디나 회원 아이디.
  message: String,
  expiresTime: {
    type: Date,
    expires: "24h", // 24시간 후에 문서가 만료되도록 설정
    default: () => Date.now() + 24 * 60 * 60 * 1000, // 현재 시간에 24시간을 더한 시간을 기본값으로 설정
  },
});
//변수명               모델 이름 스키마이름
const chatLog = mongoose.model("ChatLog", ChatLogSchema);
// chatLog.collection.createIndex({ expiresTime: 1 }, { expireAfterSeconds: 0 });

module.exports = chatLog;
