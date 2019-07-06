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
app.use(bodyParser.json());                        // Supports JSON encoded bodies
app.use(bodyParser.urlencoded({extended : true})); // Supports encoded bodies

// -----------------------------------------------------------------------------
// ** ROUTE **
// -----------------------------------------------------------------------------

// Logging in as a client
app.post('/client', (req, res) => {

  let CID; // CID that we receive from the query
  let sql; // Query string

  if(!req.body.email || !req.body.password) res.redirect('/client');

  // Selects all AID that possess are connected to the provided email
  sql = "SELECT * FROM Client WHERE email = '?{req.body.email}'";

  database.query(sql, (err, result) => {
    if(err) throw err;
    if(result && result.CID) CID = result.CID;
  });

  // Redirects the user if and AID could not
  if(!CID) res.redirect('/client');

  // Gets password from the Admin_Password table if an AID was found
  sql = "SELECT * FROM Client_Password WHERE Client_CID = '?{CID}'";

  database.query(sql, (err, result) => {
    if(err) throw err;

    // Compares the plaintext password entered with the hashed password in the db
    bcrypt.compare(req.body.password, result.password, (err, compare) => {
      
      // If they don't match, redirect them to the homepage
      if(!compare) res.redirect('/client');

      // Initializes session values
      req.session.id     = CID;
      req.session.isAdmin = false;

      // Redirects to some page
      res.redirect('/placeholder');
    });
  });
});

// Connects to a local host
const PORT = 3001;
app.listen(PORT);
