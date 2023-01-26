const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    item_name: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        default: 'no_url'
    }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;