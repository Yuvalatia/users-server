const mongoose = require('mongoose');

const User = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    }
}, { timestamps: true });

module.exports = mongoose.model('User', User);