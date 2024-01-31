const mongoose = require('mongoose')

const societySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl1: {
        type: String
    },
    imageUrl2: {
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model('Society', societySchema)