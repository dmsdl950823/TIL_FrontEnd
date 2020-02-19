// express 서버 시작 명령어
// $ node fileName.js

var express = require("express");
var app = express();

app.listen(3000, function() {
  console.log("start! express server on port 3000");
});

app.get("/", function(req, res) {
  // ★ __dirname : 파일의 절대 경로-node 자체에 입력되어있음
  res.sendFile(__dirname + "/public/main.html");
  // ★ / 경로에 public/main.html을 전달해줘

  // 결과: localhost:3000에 main.html이 표시됨
});
