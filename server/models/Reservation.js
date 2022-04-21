const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    numberOfPeople: {
        type: String,
        required: true
    },
    // These correspond to the user creating the profile
    userId: {
        type: String,
        required: true
    }
})

const reservation = mongoose.model('reservation', reservationSchema)
module.exports = reservation