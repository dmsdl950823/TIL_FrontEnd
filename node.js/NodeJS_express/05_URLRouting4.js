// express 서버 시작 명령어
// $ node fileName.js

var express = require("express");
var app = express();

app.listen(3000, function() {
  console.log("start! express server on port 3000");
});

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/main.html");
});

// ★ 경로지정 - localhost:3000/main 으로 접속하면 main.html 반영
app.get("/main", function(req, res) {
  res.sendFile(__dirname + "/public/main.html");
});
