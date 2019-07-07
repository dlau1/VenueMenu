var express =  require ('express'); //calls express

var app = express(); //let's app access express 

var connection = require('./config'); //gets connection settings from config.js in the same file

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Connection to Server and shows connected if success and error if failure.
connection.connect(function(error) {
    if(!!error) {
        console.log('Error'); 
    }
    else
    {
        console.log('Connected'); 
    }
})

//Respond to a GET request from client side
//Selects all data from client where CID matches CID from stall.
app.get('/viewActiveClient', function (req, res) {
    connection.query("SELECT client.CID, client.stallName, client.email, client.accountDue, client.firstName, client.lastName, client.present, client.securityQuestion, client.securityAnswer FROM client2 JOIN stall ON client2.CID = stall.Client_CID", function(error, result)
    {
        if(!!error) {
            console.log('Error'); // logs errors during the query selection
        }
        else{
            res.json(result);   //sends result as a json object
        }
    });
  });


//Set port in whatever is in PORT, or 5000. Let's the environment set the PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));