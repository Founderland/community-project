const mongoose = require("mongoose");

const investorsResponseSchema = new mongoose.Schema({
  question_id: { type: String, required: true },
  answer: { type: String, required: true },
  userId: { type: Number, required: true },
});

// Maybe something like {
// userEmail:{ type: String, required: true },
// response:[
//   {
//   question_id: { type: String, required: true },
//   answer: { type: String, required: true }
//   open:{type: String} only if the answer is open
// }
// ]
// }

const Investor = mongoose.model(
  "InvestorFormResponse",
  investorsResponseSchema
);

module.exports = Investor;
