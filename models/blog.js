const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    blog_image: {
        type: String,
        default: 'blog_image.jpg'
    },
    date: {
        type: String,
        reqired: true
    },
    post: {
        type: String,
        required: true
    },
    post_title: {
        type: String,
        regured: true
    }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;