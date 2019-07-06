var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mysql = require("mysql");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

// //config file stuff
// var env = process.env.NODE_ENV || 'development';
// var config = require('./config')[env];
//for static folder
// app.use( express.static( "public" ) );

// //take input from config.js and use as vars for connection
// //currently not used because of testing
// var host = config.database.host;
// var user = config.database.user;
// var password = config.database.password;
// var database = config.database.database;

//establish connection with database
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "wolverine"
});

//attempt to connect to db
connection.connect(function(error) {
  if (error) {
    console.log("Error while connecting to database");
  } else {
  }
});

app.post("/insertTag", function(req, res) {
  // get data from forms and add to the table called user..

  var tagName = req.body.tagName;
  var VID = req.body.Venue_VID;

  console.log(tagName);

  var sql = `INSERT INTO Tag 
    (
        tagName, Venue_VID
    )
    VALUES
    (
        ?, ?
    )`;

  connection.query(sql, [tagName, VID], function(err, data) {
    if (err) {
      // some error occured
      console.log("Insert Error");
    } else {
      // successfully inserted into db
      console.log("No errors inserting");
    }
  });
  res.redirect("/");
});
