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
    blog_content: {
        type: String,
        required: true
    },
    blog_title: {
        type: String,
        regured: true
    },
    blog_author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;