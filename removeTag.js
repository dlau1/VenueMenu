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

// remove tag
app.post('/removeTag',(req, res) => {
    
    let sql = `DELETE FROM Tag WHERE TID = ${req.body.TID}`;
    
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Tag removed..');
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
