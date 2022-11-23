const express = require("express");
const User = require('../models/user');
const router = express.Router();

router.get('/users', async (req, res) => {
    const users = await User.find({});
    res.render('users/index', { users });
});

router.get('/users/new', (req, res) => {
    res.render('users/new')
})

router.post('/users/index', async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    const newUser = new User(req.body);
    await newUser.save();
    res.redirect(`/users/${newUser._id}`);
});

router.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render('users/show', { user });
});

router.get('/', (req, res) => {
    res.render('home');
});

module.exports = router;