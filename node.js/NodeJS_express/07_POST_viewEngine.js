// express 서버 시작 명령어
// $ node fileName.js

var express = require("express");
var app = express();

var bodyParser = require("body-parser");

app.listen(3000, function() {
  console.log("start! express server on port 3000");
});

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ★ view engine을 ejs로 사용할것 - 설정(pug, ejs 등도 가능)
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/main.html");
});

app.post("/email_post", function(req, res) {
  console.log(req.body.email);
  // -- 에다가 {}로 치환해서 응답해줘
  res.render("email.ejs", { email: req.body.email });
});
