const express = require('express');
const app = express();
const  bodyParser = require('body-parser');
const  port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true})); 

const mysql = require('mysql');
const connection = require('./db');

//set verify to 0 for stall verification

app.post("/", function(req, res) {
    var isNotVerfied = "UPDATE Stall SET verify = '0' WHERE SID = 1";
    connection.query(isNotVerfied, function (err, result) {
    if (err) throw err;
    console.log(`Changed ${result.changedRows} row(s)`);
    res.json(result);
    })
});
