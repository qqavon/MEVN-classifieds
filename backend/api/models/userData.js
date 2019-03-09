const mongoose = require('mongoose')

const UserData = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    phone: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model('userData', UserData)