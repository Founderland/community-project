const mongoose = require('mongoose')

const investorsApplicantSchema = new mongoose.Schema({
    question: {type: String, required: true},
    answer: {type: String, required: true},
    userId: {type: Number, required: true}, 
})

const Investor = mongoose.model('Investor',investorsApplicantSchema)

module.exports = Investor