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

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/main.html");
});

app.post("/email_post", function(req, res) {
  res.render("email.ejs", { email: req.body.email });
});

// ★ ajax route 등록, 응답 확인 F12 - Network, 서버에서 클라이언트에게 전송
app.post("/ajax_send_email", function(req, res) {
  console.log(req.body.email);

  // check validation about inpit value => select db
  var responseData = { result: "ok", email: req.body.email };
  res.json(responseData);
});
