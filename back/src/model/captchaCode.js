const mongoose = require("mongoose");

const captchaCodeSchema = new mongoose.Schema({
  Num: String,
  expiresTime: {
    type: Date,
    expires: "5m",
    default: Date.now,
  },
});
//만료 시간을 5분으로 설정했습니다.
const captchaCode = mongoose.model("captchaCode", captchaCodeSchema);
captchaCode.collection.createIndex(
  { expiresTime: 1 },
  { expireAfterSeconds: 0 }
);
//인덱스 설정을 통해 정해진 시간이 지나면 삭제되도록 합니다.

module.exports = captchaCode;
