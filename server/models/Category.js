const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryname: {
        type: String,
        required: true
    },
    userEmail: {
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

const category = mongoose.model('category', categorySchema)
module.exports = category