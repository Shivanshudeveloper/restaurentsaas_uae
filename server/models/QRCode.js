const mongoose = require('mongoose');

const QRCodeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    table: {
        type: String,
        required: false
    },
    // These correspond to the user creating the profile
    userId: {
        type: String,
        required: true
    }
})

const QRCode = mongoose.model('QRCode', QRCodeSchema)
module.exports = QRCode