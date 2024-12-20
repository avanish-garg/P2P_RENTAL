const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    tokenId: {
        type: Number,
        required: true,
        unique: true,
    },
    owner: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    // Add other fields if necessary (e.g., rental status, rental history)
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
