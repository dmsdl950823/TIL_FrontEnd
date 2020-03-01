// express 서버 시작 명령어
// $ node fileName.js

var express = require("express");
var app = express(); // express 실행s
var bodyParser = require("body-parser");

app.listen(3000, function() {
  console.log("start! express server on port 3000");
  // 동기적 코드가 나중
});

// for (var i = 0; i < 100; i++) {
//   console.log("end of server code ...");
//   // node는 비동기로 동작하기 때문에 이게 먼저..
// }

app.use(express.static("public"));
// public이란 dir를 static으로 기억하도록함.
app.use(bodyParser.json()); // bodyParser 쓸거야.
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs"); // ejs 쓸래

// Routing - 라우팅
// express에서 찾아보기
app.get("/", function(req, res) {
  // 요청, 응답
  //   res.send("<h1>hey buddy!</h1>");
  // __dirname : 파일의 절대 경로-node 자체에 입력되어있음
  res.sendFile(__dirname + "/public/main.html");
});

// .../main 경로로 main.html또 지정
app.get("/main", function(req, res) {
  res.sendFile(__dirname + "/public/main.html");
});

// /email_post에 표시될 내용들을 render/send로 호출
app.post("/email_post", function(req, res) {
  // get : req.param('email')
  // console.log(req.body); // 객체 형태
  // res.send("post response");  // 한번에 send/render는 하나씩 가능
  // res.send("<h1>welcome! </h1>" + req.body.email);
  res.render("email.ejs", { email: req.body.email }); // -- 에다가 {}로 치환해서 응답해줘 ..
});

// /ajax_send_email이 왔을때, 실행해
app.post("/ajax_send_email", function(req, res) {
  console.log(req, res);
  // check vadidation about input value => select db (db조회후 타당성 판별)
  var responseData = { result: "ok", email: req.body.email };
  console.log(req.body.email);
  res.json(responseData);
});
