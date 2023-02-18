const express = require("express");
const Item = require("../models/item");
const User = require('../models/user');
const Blog = require('../models/blog')
const router = express.Router();
const users = require('../controllers/users');
const path = require('path');


router.get('/', (req, res) => {
    res.render('home');
});

router.get('/users', users.displayAllUsers);

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
    var newUser;
    if (req.files == null) {
        newUser = new User({
            "username": req.body.username, "password": req.body.password,
            "status": req.body.status, "profile_image": "np_profile_img.jpg"
        });
    } else {
        const { profile_image } = req.files;
        profile_image.mv("public" + "/" + "images" + "/" + "profile" + "/" + profile_image.name);
        newUser = new User(req.body);
        newUser.profile_image = profile_image.name
    }
    await newUser.save();
    res.redirect(`/users/${newUser._id}`);
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

router.get('/blogs', async (req, res) => {
    const blogs = await Blog.find({});
    for (let blog of blogs) {
        blog.blog_content = blog.blog_content.slice(0, 160);
    }
    res.render('blog/blogPage', { blogs });

});

router.get('/blogs/new', async (req, res) => {
    res.render('blog/blogForm');
});

router.post('/blogs', async (req, res) => {
    var newBlog;
    var blog_image = 'blog_image.jpg';
    if (req.files != null) {
        var { blog_image } = req.files;
        const blog_imagePath = path.join('public', 'images', 'blog', `${blog_image.name}`);
        blog_image.mv(blog_imagePath, err => {
            if (err) return res.status(500).send(err);
        })
        blog_image = blog_image.name
    }
    newBlog = new Blog(req.body);
    newBlog.blog_image = blog_image;

    await newBlog.save();
    res.redirect('/blogs');
});

module.exports = router;