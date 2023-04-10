const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        enum: [true, false],
        required: true
    },
    profile_image: {
        type: String,
        default: 'np_profile_img.jpg'
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
    },
    phone: {
        type: String
    },
    role: {
        type: String,
        enum: [admin, regular],
        default: 'regular'
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;