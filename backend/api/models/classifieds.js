const mongoose = require('mongoose')

const Classifieds = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    category: Number,
    name: String,
    description: String,
    voivodeship: Number
}, {
    timestamps: true
})

module.exports = mongoose.model('classifieds', Classifieds)