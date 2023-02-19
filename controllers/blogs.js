const Blog = require('../models/blog');
const path = require('path');

module.exports.renderBlogPage = async (req, res) => {
    const blogs = await Blog.find({});
    for (let blog of blogs) {
        blog.blog_content = blog.blog_content.slice(0, 160);
    }
    res.render('blog/blogPage', { blogs });

};

module.exports.renderBlogForm = async (req, res) => {
    res.render('blog/blogForm');
};

module.exports.createNewBlogPost = async (req, res) => {
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
};
