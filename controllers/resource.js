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
      categoryIcon: 1,
      categoryColor: 1,
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
  try {
    const result = await Resource.findOne({
      articles: { $elemMatch: { _id: id } },
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
// Update Resource
const editResource = async (req, res) => {
  const {
    member,
    articleTitle,
    articleDescription,
    articleContent,
    articleCover,
    articleFile,
    articleType,
    articleSubmittedDate,
    categoryKey,
    sources,
    tags,
    _id,
  } = req.body
  try {
    const article = {
      _id,
      member: member._id,
      articleTitle,
      articleDescription,
      articleContent,
      articleCover,
      articleFile,
      articleType,
      articleSubmittedDate,
      sources,
      tags,
      articleLastUpdateDate: new Date(),
    }
    const updatedResource = await Resource.updateOne(
      { articles: { $elemMatch: { _id: _id } } },
      { $set: { "articles.$": { ..."articles.$", ...article } } },
      { new: true }
    )
    if (!updatedResource) {
      await Promise.reject("Error saving resource")
    }
    const result = await Resource.findOne({
      articles: { $elemMatch: { _id } },
    })
    if (result.categoryKey !== categoryKey) {
      const article = result.articles.filter((article) =>
        article._id.equals(_id)
      )
      const deletedResource = await Resource.updateOne(
        { categoryKey: result.categoryKey },
        {
          $pull: { articles: { _id } },
        },
        { new: true }
      )
      const addArticle = await Resource.updateOne(
        { categoryKey },
        { $push: { articles: article } }
      )
    }
    return res.status(200).json({ success: true, resource: article })
  } catch (e) {
    console.log(e)
    return res.status(404).json({ e })
  }
}
//Delete Resource
const deleteResource = async (req, res) => {
  const { id, article } = req.params
  try {
    let deletedResource = null
    if (article !== "folder") {
      deletedResource = await Resource.findByIdAndUpdate(
        { _id: id },
        {
          $pull: { articles: { _id: article } },
        },
        { new: true }
      )
    } else {
      deletedResource = await Resource.deleteOne({ _id: id })
    }
    if (!deletedResource) await Promise.reject("NOT_FOUND")
    res.status(200).json({
      success: true,
      message: "Resource has been deleted",
    })
  } catch (e) {
    console.log(e)
    if (e === "NOT_FOUND") {
      res.status(404).json({ message: "Sorry we couldn't find the ressource" })
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
