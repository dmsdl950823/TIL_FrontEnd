// express 서버 시작 명령어
// $ node fileName.js

var express = require("express");
var app = express(); // express 실행

// ★ 서버를 3000포트에서 열어라.
app.listen(3000, function() {
  // 2. 실행
  console.log("start! express server on port 3000");
});

// 비동기로 시작이 되기 때문에 1. 실행
console.log("end of server code...");

// "express": "^4.17.1"

// nodemon => 실시간으로 파일변화를 관찰, 반영 (global로 설치하면 좋음)
// "nodemon": "^2.0.2"
