const mongoose = require("mongoose")

const founderFormSchem = new mongoose.Schema({
  category: { type: String, required: true },
  question: { type: String, required: true },
  rank: {
    type: String,
    enum: ["vital", "important", "moderate", "info"],
    default: "info",
    required: true,
  },
  type: {
    type: String,
    enum: ["open", "list", "choice", "multiple", "email"],
    required: true,
  },

  answers: [
    {
      answer: { type: String, required: true },
      ideal: { type: Boolean },
      points: { type: Number, default: 0, required: true },
      notes: { type: String },
    },
  ],
  categoryPage: { type: Number, required: true },
  mandatory: { type: Boolean, default: false, required: true },
})

const FounderForm = mongoose.model("FounderForm", founderFormSchem)

module.exports = FounderForm
