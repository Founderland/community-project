const mongoose = require("mongoose")

const NewsLetterFormSchema = new mongoose.Schema({

  question: { type: String, required: true },
  type: {
    type: String,
    enum: ["open", "choice"],
    required: true,
  },
  answers: [
    {
      answer: { type: String, required: true },
    },
  ]
//   categoryPage: { type: Number, required: true },
//   mandatory: { type: Boolean, default: false, required: true },
})

const  NewsLetterForm = mongoose.model("InvestorsForm", NewsLetterFormSchema)

module.exports = NewsLetterForm