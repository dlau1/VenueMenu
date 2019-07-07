const express = require('express');
const app = express();
const  bodyParser = require('body-parser');
const  port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true})); 

const mysql = require('mysql');
const connection = require('./db');

//set verify to 1 for stall verification

app.post("/", function(req, res) {
    var isVerfied = "UPDATE Stall SET verify = '1' WHERE SID = 1";
    connection.query(isVerfied, function (err, result) {
    if (err) throw err;
    console.log(`Changed ${result.changedRows} row(s)`);
    res.json(result);
    })
});
