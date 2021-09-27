const mongoose = require("mongoose")

const investorsResponseSchema = new mongoose.Schema({
  question_id: { type: String, required: true },
  answer: { type: String, required: true },
  userId: { type: Number, required: true },
})

const Investor = mongoose.model("Founder", investorsResponseSchema)

module.exports = Investor
