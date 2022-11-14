const express = require("express");
const ejsMate = require('ejs-mate');
const path = require('path');
const app = express();

app.use('/public', express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.send('get request');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    // res.send(`Succesfully Loged In: Your username is: ${username} , and password: ${password}`);
    res.render('login', { username, password });
});

app.listen(3000, () => {
    console.log("serving on port 3000!");
});
