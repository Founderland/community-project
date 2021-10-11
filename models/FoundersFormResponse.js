const mongoose = require("mongoose");

const foundersResponseSchema = new mongoose.Schema({
  applicantName: { type: String },
  totalScore: { type: Number },
  answerData:
    [
      {
        question_id: { type: mongoose.Schema.Types.ObjectId, ref:'FounderForm', required: true },
        answer_id: { type: String, },
        answer_value: { type: String, },
        score: { type: String, },
      }
    ]

});

const FoundersFormResponse = mongoose.model(
  "FoundersFormResponse",
  foundersResponseSchema
);

module.exports = FoundersFormResponse;