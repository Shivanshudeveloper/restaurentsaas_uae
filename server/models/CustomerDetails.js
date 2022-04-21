const mongoose = require('mongoose');

const customerDetailsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    // These correspond to the user creating the profile
    userId: {
        type: String,
        required: true
    }
})

const customerDetails = mongoose.model('customerDetails', customerDetailsSchema)
module.exports = customerDetails