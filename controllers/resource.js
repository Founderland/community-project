const Resource = require("../models/Resource")

// Add Resource
const addResource = async (req, res, next) => {
  const {
    member,
    articleTitle,
    articleDescription,
    categoryKey,
    articleContent,
    articleCover,
    articleFile,
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
      articleCover,
      articleFile,
      articleType,
      sources,
      tags,
      articleSubmittedDate: new Date(),
      articleLastUpdateDate: new Date(),
    }
    const newResource = await Resource.updateOne(
      { categoryKey },
      { $push: { articles: article } }
    )
    if (!newResource) {
      await Promise.reject("Error saving resource")
    }
    return res.status(200).json({ success: true, resource: newResource })
  } catch (e) {
    console.log(e)
    return res.status(404).json({ e })
  }
}
const addCategory = async (req, res, next) => {
  const { categoryName, categoryKey, categoryIcon, categoryColor } = req.body
  try {
    const existing = await Resource.findOne({ categoryKey })
    if (existing) throw new Error("CATEGORY_EXISTS_ALREADY")
    const category = {
      categoryName,
      categoryKey,
      categoryIcon,
      categoryColor,
    }
    const newResource = await Resource.create(category)
    if (!newResource) {
      await Promise.reject("Error saving resource")
    }
    return res.status(200).json({ success: true, resource: newResource })
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

// Find Resource
const findAllResource = async (req, res) => {
  try {
    const result = await Resource.find(
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
const findResourcesByCategory = async (req, res) => {
  const { category } = req.params
  try {
    const result = await Resource.find({
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
const findResourceById = async (req, res) => {
  const { id } = req.params
  console.log(id)
  try {
    const result = await Resource.findOne({
      articles: { $elemMatch: { _id: id } },
    }).populate({
      path: "articles.member",
      model: "Member",
      select: ["firstName", "lastName", "role", "photo"],
    })
    console.log(result)
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
  }
}
// Update Resource
const editResource = async (req, res) => {
  const { id } = req.params
  try {
    const updated = await Resource.findByIdAndUpdate(id, {
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
//Delete Resource
const deleteResource = async (req, res) => {
  const { id, commentId } = req.params
  try {
    const updatedList = await Resource.findByIdAndUpdate(
      id,
      {
        $pull: { comments: { _id: commentId } },
      },
      { new: true }
    )

    if (!updatedList) await Promise.reject("NOT_FOUND")
    res.json({
      message: "Resource has been deleted",
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
  addResource,
  findAllResource,
  findResourceById,
  findResourcesByCategory,
  editResource,
  deleteResource,
  addCategory,
}
