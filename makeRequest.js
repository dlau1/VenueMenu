const express = require('express');
const app = express();
const db = require('./config');

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// connect to db
db.connect((err) => {
    if(err) throw err;
    console.log("Connected to database successfully.."); 
});

// make request
app.post('/makeRequest',(req, res) => {
    
    let request = {text:`${req.body.text}`, Client_CID:`${req.body.Client_CID}`, Venue_VID:`${req.body.Venue_VID}`, status:0};
    let sql = 'INSERT INTO Request SET ?';
    
    let query = db.query(sql, request, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Request made..');
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
