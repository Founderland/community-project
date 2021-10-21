const mongoose = require("mongoose")

const alliesFormSchema = new mongoose.Schema({
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

const AlliesForm = mongoose.model("AlliesForm", alliesFormSchema)

module.exports = AlliesForm
