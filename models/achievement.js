const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    }, 
    imageUrl1: {
        type: String,
        unique: true,
        sparse: true
    },
    imageUrl2: {
        type: String,
        unique: true,
        sparse: true
    },
}, {timestamps: true});

module.exports = mongoose.model('Achievement', achievementSchema);
