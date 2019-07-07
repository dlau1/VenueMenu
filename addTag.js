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

// add tag
app.post('/addTag',(req, res) => {
    
    let tag = {tagName:`${req.body.tagName}`, Venue_VID:`${req.body.Venue_VID}`};
    let sql = 'INSERT INTO Tag SET ?';
    
    let query = db.query(sql, tag, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Tag added..');
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
