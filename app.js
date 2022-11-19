const express = require("express");
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

const User = require('./models/user');

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


app.get('/', (req, res) => {
    res.render('home');
});

app.get('/users', async (req, res) => {
    const users = await User.find({});
    res.render('users/index', { users });
});

app.post('/users/index', async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    const newUser = new User(req.body);
    await newUser.save();
    // res.send(`Succesfully Loged In: Your username is: ${username} , and password: ${password}`);
    res.redirect('/');
});

app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render('users/show', { user });
});

app.listen(3000, () => {
    console.log("serving on port 3000!");
});
