const mongoose = require("mongoose")

const foundersResponseSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  totalScore: { type: Number },
  submissionDate: { type: Date, default: Date.now(), required: true },
  evaluatedOn: { type: Date },
  status: {
    type: String,
    enum: ["new", "pending", "approved", "rejected"],
    default: "new",
    required: true,
  },
  answerData: [
    {
      question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FounderForm",
        required: true,
      },
      question: { type: String },
      rank: { type: String },
      category: { type: String },
      answer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FounderForm",
      },
      answer_value: { type: String },
      score: { type: String },
    },
  ],
})

const FoundersFormResponse = mongoose.model(
  "FoundersFormResponse",
  foundersResponseSchema
)

module.exports = FoundersFormResponse
