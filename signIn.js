const express = require('express');
const app = express();
const  bodyParser = require('body-parser');
const  port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true})); 

const mysql = require('mysql');
const connection = require('./db');

//set present to 1 for attendance

app.post("/", function(req, res) {
    var isPresent = "UPDATE Client SET present = '1' WHERE CID = 1";
    connection.query(isPresent, function (err, result) {
    if (err) throw err;
    console.log(`Changed ${result.changedRows} row(s)`);
    res.json(result);
    })
});


