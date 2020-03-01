// router/main.js와 함께 참고
// router/email.js와 함께 참고

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var main = require("./router/main");
// ★ router 모듈 불러오기
var email = require("./router/email");

app.listen(3000, function() {
  console.log("start! express server on port 3000");
});

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ★ /main에 대한 모듈을 main으로 사용할것이다.
app.use("/main", main);
// localhost:3000/email/form 또는 /email/ajax 으로 확인해보기
app.use("/email", email);

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/main.html");
});

// DB 모듈화
