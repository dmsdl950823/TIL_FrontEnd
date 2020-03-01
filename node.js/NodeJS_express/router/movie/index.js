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

router.get("/list", function(req, res) {
  res.render("movie.ejs");
});

// 1. /movie, GET
router.get("/", function(req, res) {
  var responseData = {};

  var querySelect = `SELECT title FROM movie_api_practice`;
  var query = connection.query(querySelect, function(err, rows) {
    if (err) throw err;
    if (rows.length) {
      console.log(rows);
      responseData.result = 1;
      responseData.data = rows;
    } else {
      responseData.result = 0;
    }
    res.json(responseData);
  });
});

// 2. /movie, POST
router.post("/", function(req, res) {
  var title = req.body.title;
  var type = req.body.type;
  var grade = req.body.grade;
  var actor = req.body.actor;

  var queryState = `
    INSERT INTO movie_api_practice (title,type, grade, actor)
    VALUES ('${title}', '${type}','${grade}','${actor}')`;
  var query = connection.query(queryState, function(err, rows) {
    if (err) throw err;
    return res.json({ result: 1 });
  });

  // 3. /movie/:title, GET
  router.get("/:title", function(req, res) {
    var title = req.params.title;
    console.log("title => ", title);
    var responseData = {};

    var querySelect = `SELECT * FROM movie_api_practice WHERE title="${title}"`;
    var query = connection.query(querySelect, function(err, rows) {
      if (err) throw err;
      if (rows[0]) {
        responseData.result = 1;
        responseData.data = rows;
      } else {
        responseData.result = 0;
      }
      res.json(responseData);
    });
  });
});

// 4. /movies/:title DELETE
router.delete("/:title", function(req, res) {
  var title = req.params.title;
  var responseData = {};

  var querySelect = `DELETE FROM movie_api_practice WHERE title="${title}"`;
  var query = connection.query(querySelect, function(err, rows) {
    if (err) throw err;
    console.log("rows", rows);
    if (rows[0]) {
      responseData.result = 1;
      responseData.data = rows;
    } else {
      responseData.result = 0;
    }
    res.json(responseData);
  });
});

module.exports = router;
