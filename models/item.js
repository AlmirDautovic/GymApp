const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    item_name: {
        type: String,
        required: true
    },
    item_image: {
        type: String,
        default: 'no_image.jpg'
    },
    description: {
        type: String,
        required: true
    },
    usage: {
        type: String,
        required: true
    }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;