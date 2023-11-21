const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    action: {
        type: String,
        required: true,
        enum: ['create user', 'read user','update user', 'delete user'],
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

module.exports = mongoose.model('Log', logSchema);
