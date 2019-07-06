// Routing for the Admin and Client account creation and login

// Michael Fielder

// -----------------------------------------------------------------------------
// ** IMPORTS **
// -----------------------------------------------------------------------------

const express    = require('express');
const mysql      = require('mysql');           // Used for MySQL queries
const session    = require('express-session'); // Used for creating sessions
const bcrypt     = require('bcrypt');          // Used for encrypting passwords
const bodyParser = require('body-parser');     // Used for getting request values

const app = express();

// Connection information for the database
const database = mysql.createConnection({
  host     : '',
  user     : '',
  password : '',
  database : ''
});

// Connects to the database and returns an error if it doesn't
database.connect((err) => {
  if(err) throw err;
  console.log('MySQL Connected...');
});

// -----------------------------------------------------------------------------
// ** MIDDLEWARE **
// -----------------------------------------------------------------------------

// Express Session
app.use(session({secret : 'projectwolverinevenue'}));

// Body Parser
app.use(bodyParser.json()); // Supports JSON encoded bodies
app.use(bodyParser.urlencoded({extended : true})); // Supports encoded bodies

// -----------------------------------------------------------------------------
// ** ROUTE **
// -----------------------------------------------------------------------------

// TODO
// Creating a client account
app.post('/create_account/client', (req, res) => {
  let sql; // Used for queries
  let CID; // TODO IMPLEMENTATION

  // Makes sure that all input fields are inputted and that both passwords match
  if(!req.body.email || !req.body.password || !req.body.rePassword) res.redirect('/client');
  if(req.body.password != req.body.rePassword) res.redirect('/client');

  // If all the information is in place, we can create an account

  // Query to find all instances of email in the Client table
  sql = "SELECT * FROM Client WHERE email = '?{req.body.email}'";

  database.query(sql, (err, result) => {
    if (err) throw err;

    // If a user already exists with the inputted email, then redirect the user
    if(result) res.direct('/client');
  });

  // Inserts the email into the Client datab
  sql = "INSERT INTO Client (email) VALUES ('?{req.body.email}')";

  database.query(sql, (err, result) => {if (err) throw err;});


  // Encrypts the password and stores it in the Client_Password database
  bcrypt.hash(req.body.password, saltRounds, (error, hash) => {

    if (error) throw error;

    sql = "INSERT INTO Client_Password (password) VALUES ('?{hash}')";

    database.query(sql, (err, result) => {if (err) throw err;});
  });
});

// Placeholder connection information
const PORT = 3001;
app.listen(PORT);
