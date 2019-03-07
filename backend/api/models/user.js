const mongoose = require('mongoose')

const User = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    email: String,
    password: String
}, {
    timestamps: true
})

module.exports = mongoose.model('user', User)