const mongoose = require('mongoose')

const foundersResponseSchema = new mongoose.Schema({
    question: {type: String, required: true},
    answer: {type: String, required: true},
    userId: {type: Number, required: true}, 
})

const Founder = mongoose.model('Founder',foundersResponseSchema)

module.exports = Founder