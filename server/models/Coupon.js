const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    // These correspond to the user creating the profile
    userId: {
        type: String,
        required: true
    }
})

const coupon = mongoose.model('coupon', couponSchema)
module.exports = coupon