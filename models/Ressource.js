const mongoose = require("mongoose")

const ressourceSchema = new mongoose.Schema({
  categoryName: { type: String },
  path: { type: String },
  articles: [
    {
      articleName: { type: String },
      articleDescription: { type: String },
      articleBody: { type: String },
      articleSubmittedDate: { type: String },
      articleLastUpdateDate: { type: String },
    },
  ],
})

const Ressource = mongoose.model("Ressource", ressourceSchema)

module.exports = Ressource
