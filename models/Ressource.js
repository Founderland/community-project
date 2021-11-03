const mongoose = require("mongoose")

const ressourceSchema = new mongoose.Schema({
  categoryName: { type: String },
  categoryKey: { type: String },
  path: { type: String },
  articles: [
    {
      articleName: { type: String },
      articleDescription: { type: String },
      articleContent: { type: String },
      articleType: { type: String },
      articleSubmittedDate: { type: String },
      articleLastUpdateDate: { type: String },
    },
  ],
})

const Ressource = mongoose.model("Ressource", ressourceSchema)

module.exports = Ressource
