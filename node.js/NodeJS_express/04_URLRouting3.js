// express 서버 시작 명령어
// $ node fileName.js

var express = require("express");
var app = express();

app.listen(3000, function() {
  console.log("start! express server on port 3000");
});

// ★ public이란 dir를 static으로 기억
//   - public의 모든 파일 내려받음, 경로 지정완료
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/main.html");
});
