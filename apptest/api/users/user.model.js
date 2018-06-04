const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String,
        select: false
    }
});

module.exports = mongoose.model('User', UserSchema);