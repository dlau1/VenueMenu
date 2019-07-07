var mysql = require("mysql");

// create connection
const db = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : '',
    database    : 'mydb'
});

module.exports = db;