const express = require("express");
const User = require('../models/user');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

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

router.get('/users/:id/edit', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render('users/edit', { user })
});

router.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { runValidators: true });
    res.redirect(`/users/${user._id}`);
});


module.exports = router;