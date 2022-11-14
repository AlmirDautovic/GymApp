const express = require("express");
const ejsMate = require('ejs-mate');
const path = require('path');
const app = express();

app.use('/public', express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render('home');
});


app.listen(3000, () => {
    console.log("serving on port 3000!");
});
