const express = require("express");
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
var routes = require('./routes/index');

mongoose.connect('mongodb://localhost:27017/GymApp', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
});

app.use('/public', express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use('/', routes);

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log("serving on port 3000!");
});
