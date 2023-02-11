const express = require("express");
const Item = require("../models/item");
const User = require('../models/user');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/users', async (req, res) => {
    const { status } = req.query;
    var users;
    if (status == 'true') {
        users = await User.find({ status });
    } else if (status == "false") {
        users = await User.find({ status: { $ne: true } });
    }
    else {
        users = await User.find({});
    }
    res.render('users/index', { users });
});

router.get('/users/change', async (req, res) => {
    const { status } = req.query;
    var users;
    if (status == 'true') {
        users = await User.find({ status });
    } else if (status == "false") {
        users = await User.find({ status: { $ne: true } });
    }
    else {
        users = await User.find({});
    }
    res.json(users)
});

router.get('/users/new', (req, res) => {
    res.render('users/new')
})

router.post('/users/index', async (req, res) => {
    // if (!profile_image) return res.sendStatus(400);
    var newUser;
    if (req.files == null) {
        newUser = new User({ "username": req.body.username, "password": req.body.password, "status": req.body.status, "profile_image": "np_profile_img.jpg" });
    } else {
        const { profile_image } = req.files;
        profile_image.mv("public" + "/" + "images" + "/" + "profile" + "/" + profile_image.name);
        newUser = new User(req.body);
        newUser.profile_image = profile_image.name
    }
    await newUser.save();
    res.redirect(`/users/${newUser._id}`);
    // res.sendStatus(200);
});

router.get('/users/json', async (req, res) => {
    const { id } = req.query;
    const users = await User.find({ _id: { $ne: id } }, { username: 1, status: 1, profile_image: 1 });
    res.json(users);
});

router.delete('/users/delete', async (req, res) => {
    const { id } = req.query;
    const deletedUser = await User.findByIdAndDelete(id);
    res.json({});
})

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

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.redirect('/users');
});

router.get('/contact', async (req, res) => {
    res.render('contact');
});

router.get('/gymequipment', async (req, res) => {
    const items = await Item.find({});
    res.render('gymequipment', { items });
});

router.post('/gymequipment', async (req, res) => {
    const item = new Item(req.body);
    await item.save();
    res.status(201).send(item);
});

router.get('/gymitem', async (req, res) => {
    const items = await Item.find({});
    res.json(items)
});

router.get('/blog', async (req, res) => {
    res.render('blog/blogPage');
});

router.get('/newpost', async (req, res) => {
    res.render('blog/blogForm')
});

router.post('/blog', async (req, res) => {
    res.send('Posted')
})


module.exports = router;