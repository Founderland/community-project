const mongoose = require("mongoose")

const ressourceSchema = new mongoose.Schema({
  categoryName: { type: String },
  categoryKey: { type: String },
  categoryIcon: { type: String },
  path: { type: String },
  articles: [
    {
      member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Members",
        default: null,
      },
      articleTitle: { type: String },
      articleDescription: { type: String },
      articleContent: { type: String },
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

const Ressource = mongoose.model("Ressource", ressourceSchema)

module.exports = Ressource
