// express 서버 시작 명령어
// $ node fileName.js

var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// ★ mysql nodemodule 사용
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
      //   console.log(rows[0].name);
      responseData.result = "ok";
      responseData.name = rows[0].name;
    } else {
      //   console.log("none: " + rows[0]);
      responseData.result = "none";
      responseData.name = "";
    }

    // 응답(response) 값 json으로 리턴
    res.json(responseData);
  });
});

// $ npm add mysql
