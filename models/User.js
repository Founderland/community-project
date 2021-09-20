const mongoose = require('mongoose')

const userResponseSchema = new mongoose.Schema({
    question: {type: String, required: true},
    answer: {type: String, required: true},
    userId: {type: Number, required: true}, 
})

const User = mongoose.model('Founder',userResponseSchema)

module.exports = User