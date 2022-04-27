const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    itemname: {
        type: String,
        required: true
    },
    categoryname: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const menu = mongoose.model('menu', menuSchema)
module.exports = menu