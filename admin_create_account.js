// Routing for the Admin account creation
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

// Creating an admin account
app.post('/create_account/admin', (req, res) => {

  let sql; // Used for queries
  let AID; // TODO IMPLEMENTATION

  // Makes sure that all input fields are inputted and that both passwords match
  if(!req.body.email || !req.body.password || !req.body.rePassword) res.redirect('/admin');
  if(req.body.password != req.body.rePassword) res.redirect('/admin');

  // If all the information is inputted, we can try to create an account

  // Query to find all instances of email in the table
  sql = "SELECT * FROM Admin WHERE email = '?{req.body.email}'";

  database.query(sql, (err, result) => {
    if (err) throw err;

    // If a user is trying to sign up with an existing email, then redirect the user
    if(result) res.direct('/client');
  });

  // Inserts the email into the Admin datab
  sql = "INSERT INTO Admin (email) VALUES ('?{req.body.email}')";

  database.query(sql, (err, result) => {if (err) throw err;});


  // Encrypts the password and stores it in the Admin_Password table
  bcrypt.hash(req.body.password, saltRounds, (error, hash) => {

    if (error) throw error;

    // Inserts the hashed password into the table
    sql = "INSERT INTO Admin_Password (password) VALUES ('?{hash}')";

    database.query(sql, (err, result) => {if (err) throw err;});
  });
});

// Connects to a local host
const PORT = 3001;
app.listen(PORT);
