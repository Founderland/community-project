const mongoose = require('mongoose')

const founderFormSchem = new mongoose.Schema({
    category: { type: String, required: true },
    question: { type: String, required: true },
    rank: {
        type: String,
        enum: [
            'Not Important - just for info/further context',
            'Vital - Deal Maker or Breaker',
            'Very Important - variable is scrutinized',
            'Moderately Important - potentially a determining factor',
        ],
        required: true,
    },
    type: {
        type: String,
        enum: ['open', 'list', 'choice', 'multiple'],
        required: true,
    },

    answers: [
        {
            answer: { type: String, required: true },
            ideal: { type: Boolean },
            points: { type: Number, required: true },
            notes: { type: String },
        },
    ],
    categoryPage: { type: Number, required: true },
    mandatory: { type: Boolean, required: true },
})

const FounderForm = mongoose.model('FounderForm', founderFormSchem)

module.exports = FounderForm
