// express 서버 시작 명령어
// $ node fileName.js

var express = require("express");
var app = express();

// $npm insall body-parser
var bodyParser = require("body-parser");

app.listen(3000, function() {
  console.log("start! express server on port 3000");
});

// ★ 2. post로 전달받는/하는 데이터를 처리하겠다.
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/main.html");
});

// ★ 1. Post로 요청 보내기
// action="email_post" method="post" -> 폼 형식
app.post("/email_post", function(req, res) {
  // 3. 받은 내역을 object 형태로 정보 전달 => { name: "..." }
  console.log(req.body);

  // 4. post로 전송하면 /email_post 경로를 반환하고 반응함
  res.send("<h1>post response</h1>" + req.body.email);

  // get으로 전송하면 req.param('정보') -> 이런식으로 정보와 함께 전송함
});
