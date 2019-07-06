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

// Logging in as an admin
app.post('/admin', (req, res) => {

  let AID; // AID that we receive from the query
  let sql; // Query string

  if(!req.body.email || !req.body.password) res.redirect('/admin');

  // Selects all AID that possess are connected to the provided email
  sql = "SELECT * FROM Admin WHERE email = '?{req.body.email}'";

  database.query(sql, (err, result) => {
    if(err) throw err;
    if(result && result.AID) AID = result.AID;
  });

  // Redirects the user if and AID could not
  if(!AID) res.redirect('/admin');

  // Gets password from the Admin_Password table if an AID was found
  sql = "SELECT * FROM Admin_Password WHERE Admin_AID = '?{AID}'";

  database.query(sql, (err, result) => {
    if(err) throw err;

    // Compares the plaintext password entered with the hashed password in the db
    bcrypt.compare(req.body.password, result.password, (err, compare) => {

      // Redirect back to login if passwords don't match
      if(!compare) res.redirect('/admin');

      // Initializes session values
      req.session.id      = AID;
      req.session.isAdmin = true;

      // Redirects to some page
      res.redirect('/placeholder');
    });
  });
});

// Connects to a local host
const PORT = 3001;
app.listen(PORT);
