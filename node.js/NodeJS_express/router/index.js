// 라우팅을 관리하는 전체 파일

var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");

var main = require("./main");
var email = require("./email");
var join = require("./join/index");

// 회원가입

//movie - RestfulAPI
var movie = require("./movie/index");

// url routing
router.get("/", function(req, res) {
  console.log("index.html is loaded");
  var Path = path.join(__dirname, "../public/main.html");
  res.sendFile(Path);
});

// route들만 묶기
router.use("/main", main);
router.use("/email", email);
router.use("/join", join);

router.use("/movie", movie);

module.exports = router;
