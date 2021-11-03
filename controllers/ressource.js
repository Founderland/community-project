const Ressource = require("../models/Ressource")

// Add Ressource
const addRessource = async (req, res, next) => {
  const {
    member,
    articleTitle,
    articleDescription,
    categoryKey,
    articleContent,
    articleType,
    sources,
    tags,
  } = req.body
  try {
    const article = {
      member,
      articleTitle,
      articleDescription,
      articleContent,
      articleType,
      sources,
      tags,
      articleSubmittedDate: new Date(),
      articleLastUpdateDate: new Date(),
    }
    const newRessource = await Ressource.updateOne(
      { categoryKey },
      { $push: { articles: article } }
    )
    if (!newRessource) {
      await Promise.reject("Error saving ressource")
    }
    return res.status(200).json({ success: true, ressource: newRessource })
  } catch (e) {
    console.log(e)
    return res.status(404).json({ e })
  }
}
const addCategory = async (req, res, next) => {
  const { categoryName, categoryKey, categoryIcon, categoryColor } = req.body
  try {
    const existing = await Ressource.findOne({ categoryKey })
    if (existing) throw new Error("CATEGORY_EXISTS_ALREADY")
    const category = {
      categoryName,
      categoryKey,
      categoryIcon,
      categoryColor,
    }
    const newRessource = await Ressource.create(category)
    if (!newRessource) {
      await Promise.reject("Error saving ressource")
    }
    return res.status(200).json({ success: true, ressource: newRessource })
  } catch (e) {
    if (e.message === "CATEGORY_EXISTS_ALREADY") {
      res.status(403).json({
        error: 403,
        message: "Category already exists",
      })
    } else {
      return res.status(404).json({ e })
    }
  }
}

// Find Ressource
const findAllRessource = async (req, res) => {
  try {
    const result = await Ressource.find(
      {},
      { numberOfArticles: { $size: "$articles" } }
    ).select({
      categoryKey: 1,
      categoryName: 1,
    })
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
  }
}
const findRessourcesByCategory = async (req, res) => {
  const { category } = req.params
  try {
    const result = await Ressource.find({
      categoryKey: category,
    }).populate({
      path: "articles.member",
      model: "Member",
      select: ["firstName", "lastName", "role", "photo"],
    })
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
  }
}
const findRessourceById = async (req, res) => {
  const { id } = req.params
  try {
    const result = await Ressource.findOne({ _id: id }).sort({
      totalScore: "desc", //order responses by score
    })
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
  }
}
// Update Ressource
const editRessource = async (req, res) => {
  const { id } = req.params
  try {
    const updated = await Ressource.findByIdAndUpdate(id, {
      totalScore: score,
    })
    if (!updated) await Promise.reject("NOT_FOUND")
    res.json({ message: "Update successful" })
  } catch (e) {
    if (e === "NOT_FOUND") {
      res.status(404).send({
        message:
          "The question you're trying to update is no longer in the database",
      })
    } else {
      res.status(500).json({ message: "Sorry something went wrong" })
    }
  }
}
//Delete Ressource
const deleteRessource = async (req, res) => {
  const { id, commentId } = req.params
  try {
    const updatedList = await Ressource.findByIdAndUpdate(
      id,
      {
        $pull: { comments: { _id: commentId } },
      },
      { new: true }
    )

    if (!updatedList) await Promise.reject("NOT_FOUND")
    res.json({
      message: "Ressource has been deleted",
    })
  } catch (e) {
    console.log(e)

    if (e === "NOT_FOUND") {
      res.status(404).json({ message: "Sorry we couldn't find any comments" })
    } else {
      res.status(500).json({ message: "Something went wrong" })
    }
  }
}

module.exports = {
  addRessource,
  findAllRessource,
  findRessourceById,
  findRessourcesByCategory,
  editRessource,
  deleteRessource,
  addCategory,
}
