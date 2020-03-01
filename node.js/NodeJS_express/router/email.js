var express = require("express");
var app = express();
var router = express.Router();
var mysql = require("mysql");

// DB setting
var connection = mysql.createConnection({
  host: "192.168.219.117",
  port: 3306,
  user: "root",
  password: ":HdL3.jzLQfH",
  database: "frond_end",
});

connection.connect();

// Router
// form.html이 action="/email/form" 로 설정되어야 함!
router.post("/form", function(req, res) {
  res.render("email.ejs", { email: req.body.email });
});

router.post("/ajax", function(req, res) {
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

module.exports = router;
// 내가 만든 module export 시키기
