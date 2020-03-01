// router/main.js와 함께 참고
// router/email.js와 함께 참고
// router/index.js와 함께 참고 -> 전체 router
// router/movie.js와 views/movie.ejs 함께 참고

var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// ★ router 모듈 불러오기
var router = require("./router/index");

app.listen(3000, function() {
  console.log("start! express server on port 3000");
});

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// ★
app.use(router);

// http://192.168.219.106:3000/movie/list 에서 확인
