var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");
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
// localhost:3000/join
router.get("/", function(req, res) {
  console.log("get join.html! ");
  var Path = path.join(__dirname, "../../public/join.html");
  res.sendFile(Path);
});

router.post("/", function(req, res) {
  // ★ 제출버튼클릭시, 정보를 받아옴
  var body = req.body;
  var email = body.email;
  var name = body.name;
  var passwd = body.password;

  // 쿼리 다르게 쓰는 방법 - 별로인듯...
  //   var sql = { email: email, nam: name, pw: passwd };
  //   var query = connection.query("INSERT INTO node_practice ?", sql, function( err, rows ) { ... }

  var queryState = `INSERT INTO node_practice (email,name, pw) VALUES ('${email}', '${name}','${passwd}')`;
  var query = connection.query(queryState, function(err, rows) {
    if (err) throw err;
    console.log("db is inserted! : ", name);

    // 응답은 html 랜더링으로 함
    res.render("welcome.ejs", { email: body.email, name: body.name });
  });
});

module.exports = router;
