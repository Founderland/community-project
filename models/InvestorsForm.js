const mongoose = require("mongoose")

const investorsFormSchema = new mongoose.Schema({
  category: { type: String, required: true },
  question: { type: String, required: true },
  type: {
    type: String,
    enum: ["open", "list", "choice", "multiple"],
    required: true,
  },
  answers: [
    {
      answer: { type: String, required: true },
    },
  ],
  categoryPage: { type: Number, required: true },
  mandatory: { type: Boolean, default: false, required: true },
})

const InvestorsForm = mongoose.model("InvestorsForm", investorsFormSchema)

module.exports = InvestorsForm
