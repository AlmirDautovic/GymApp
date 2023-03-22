const express = require("express");
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const fileUpload = require('express-fileupload');
var routes = require('./routes/index');
const methodOverride = require('method-override');
const app = express();

mongoose.connect('mongodb://127.0.0.1/GymApp', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
});


app.use('/public', express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(fileUpload());

const sessionConfig = {
    secret: 'omladinka',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};
app.use(session(sessionConfig));

// app.use(function (req, res, next) {
//     res.locals.loggedin = req.session.loggedin;
//     next();
// });

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
