// express 서버 시작 명령어
// $ node fileName.js

var express = require("express");
var app = express();

app.listen(3000, function() {
  console.log("start! express server on port 3000");
});

// Routing - 라우팅(경로 설정) :: express 홈페이지에서 찾아보기
// ★ get으로 ("route주소", function(요청, 응답){}
app.get("/", function(req, res) {
  res.send("<h1>hey buddy!</h1>");
});
