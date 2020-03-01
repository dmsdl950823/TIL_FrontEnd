var express = require("express");
var app = express();
var router = express.Router();
// express의 Router()메서드 이용하여 경로 설정 가능

var path = require("path"); // 상대경로 이용하기

router.get("/", function(req, res) {
  console.log("main.html is loaded");
  var Path = path.join(__dirname, "../public/main.html");
  res.sendFile(Path);
});

module.exports = router;
// 내가 만든 module export 시키기
