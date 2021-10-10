const mongoose = require("mongoose");

const foundersResponseSchema = new mongoose.Schema({
  question_id: { type: Number, required: true },
  answer: { type: String, required: true },
  answerId: { type: Number, required: true },
});

const FoundersFormResponse = mongoose.model(
  "FoundersFormResponse",
  foundersResponseSchema
);

module.exports = FoundersFormResponse;