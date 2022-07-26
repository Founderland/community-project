const mongoose = require("mongoose")

const responseSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  totalScore: { type: Number },
  submissionDate: { type: Date },
  evaluatedOn: { type: Date },
  evaluatedBy: { type: String },
  status: {
    type: String,
    enum: ["new", "pending", "approved", "rejected"],
    default: "new",
    required: true,
  },
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Members",
    default: null,
  },
  role: {
    type: String,
    enum: ["founder", "investor", "ally", "newsletter"],
    default: "founder",
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
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      timeStamp: { type: Date },
      text: { type: String },
    },
  ],
})

const Response = mongoose.model("Response", responseSchema)

module.exports = Response
