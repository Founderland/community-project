const mongoose = require('mongoose')

const investorApplicantSchema = new mongoose.Schema({
    question: {type: String, required: true},
    answer: {type: String, required: true},
    userId: {type: Number, required: true}, 
})

const Investor = mongoose.model('Investor',investorApplicantSchema)

module.exports = Investor