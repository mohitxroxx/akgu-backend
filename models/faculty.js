const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    post: {
        type: String,
        enum: ['HOD','Professor','Associate Professor'],
        required: true
    },
    degree: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        unique: true,
        sparse: true 
    },
}, {timestamps: true});

module.exports = mongoose.model('Faculty', facultySchema);
