const express = require("express");
const Blog = require('../models/blog')
const router = express.Router();
const users = require('../controllers/users');
const gymItem = require('../controllers/gymEquipment');
const path = require('path');


router.get('/', users.renderHomePage);

router.get('/users', users.displayAllUsers);

router.get('/users/change', users.getSelectedUsers);

router.get('/users/new', users.renderNewForm);

router.post('/users/index', users.createNewUser);

router.get('/users/json', users.ajaxUsers);

router.get('/users/:id', users.getSelectedUser);

router.get('/users/:id/edit', users.renderEditForm);

router.put('/users/:id', users.editUser);

router.delete('/users/delete', users.deleteUserAjax);

router.delete('/users/:id', users.deleteUser);

router.get('/contact', async (req, res) => {
    res.render('contact');
});

router.get('/gymequipment', gymItem.renderGymItemPage);

router.post('/gymequipment', gymItem.createItem);

router.get('/gymitem', gymItem.displayItem);

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