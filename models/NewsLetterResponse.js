const mongoose = require("mongoose");

const NewsLetterResponseSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  interests: { type: String, required: true },
 subscriptionDate: { type: Date, default: Date.now() },
});

const NewsLetterResponse = mongoose.model(
  "NewsLetterResponse",
  NewsLetterResponseSchema
);

module.exports = NewsLetterResponse;
