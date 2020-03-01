// router/main.js와 함께 참고

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
// ★ router 모듈 불러오기
var main = require("./router/main");

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "192.168.219.117",
  port: 3306,
  user: "root",
  password: ":HdL3.jzLQfH",
  database: "frond_end",
});

connection.connect();

app.listen(3000, function() {
  console.log("start! express server on port 3000");
});

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ★ /main에 대한 모듈을 main으로 사용할것이다.
// localhost:3000/main 으로 확인해보기
app.use("/main", main);

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/main.html");
});

app.post("/email_post", function(req, res) {
  res.render("email.ejs", { email: req.body.email });
});

app.post("/ajax_send_email", function(req, res) {
  var email = req.body.email;
  var responseData = {};
  var querySelect = `SELECT name FROM node_practice WHERE email = "${email}"`;

  var query = connection.query(querySelect, function(err, rows) {
    if (err) throw err;
    if (rows[0]) {
      responseData.result = "ok";
      responseData.name = rows[0].name;
    } else {
      responseData.result = "none";
      responseData.name = "";
    }

    // 응답(response) 값 json으로 리턴
    res.json(responseData);
  });
});
