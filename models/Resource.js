const mongoose = require("mongoose")

const resourceSchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  categoryKey: { type: String, required: true },
  categoryIcon: { type: String, required: true },
  categoryColor: { type: String, required: true },
  path: { type: String },
  articles: [
    {
      member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Members",
        default: null,
      },
      articleTitle: { type: String },
      articleCover: { public_id: { type: String }, url: { type: String } },
      articleDescription: { type: String },
      articleContent: { type: String },
      articleFile: { public_id: { type: String }, url: { type: String } },

      articleType: {
        type: String,
        enum: ["link", "article", "video", "picture"],
        required: true,
      },
      articleSubmittedDate: { type: String },
      articleLastUpdateDate: { type: String },
      sources: [{ type: String }],
      tags: [{ type: String }],
    },
  ],
})

const Resource = mongoose.model("Resource", resourceSchema)

module.exports = Resource
