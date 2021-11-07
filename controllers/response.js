// const FounderApplicant = require('../models/FounderApplicant')
const Response = require("../models/Response")

// Add Founders Response

const addResponse = async (req, res, next) => {
  const { firstName, lastName, totalScore, answerData, role, email } = req.body
  try {
    const newResponse = await Response.create({
      firstName,
      lastName,
      totalScore,
      answerData,
      email,
      role,
    })
    if (!newResponse) {
      await Promise.reject("founder response error") //reject promise with error
    }
    req.newResponse = newResponse
    return next()
  } catch (e) {
    console.log(e)
    return res.status(404).json({ e })
  }
}
// Find Founders Response
const findAllResponse = async (req, res) => {
  try {
    const result = await Response.find({})
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
  }
}
const findResponsesByStatus = async (req, res) => {
  const { status, role } = req.params
  try {
    if (status === "allpending" && role) {
      const result = await Response.find({
        status: { $in: ["new", "pending"] },
      })
        .sort({
          totalScore: "desc", //order responses by score
        })
        .populate({
          path: "comments.user",
          model: "User",
          select: ["firstName", "lastName", "role", "avatar"],
        })
      res.status(200).json(result)
    } else if (role !== "null") {
      const result = await Response.find({ status, role })
        .sort({
          totalScore: "desc", //order responses by score
        })
        .populate({
          path: "comments.user",
          model: "User",
          select: ["firstName", "lastName", "role", "avatar"],
        })
      res.status(200).json(result)
    } else {
      const result = await Response.find({ status }).sort({
        totalScore: "desc", //order responses by score
      })
      res.status(200).json(result)
    }
  } catch (error) {
    console.log(error)
  }
}
const findResponseById = async (req, res) => {
  const { id } = req.params
  try {
    const result = await Response.findOne({ _id: id }).sort({
      totalScore: "desc", //order responses by score
    })
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
  }
}
// Update Founders Status
const updateStatus = async (req, res, next) => {
  const { status, applicationId, connect } = req.body
  try {
    const updateData = {
      status: status,
      evaluatedOn: Date.now(),
      evaluatedBy: req.user.firstName + " " + req.user.lastName,
    }
    if (req.newMember) updateData.memberId = req.newMember.id
    const result = await Response.findByIdAndUpdate(
      { _id: applicationId },
      updateData,
      { new: true }
    )
    if (connect) return next()
    res.status(200).json({
      success: 1,
      ...result,
    })
  } catch (error) {
    console.log(error)
  }
}
const updateNotified = async (req, res, next) => {
  const { applicationId } = req.body
  try {
    const updateData = {
      notifiedOn: Date.now(),
    }
    const result = await Response.findByIdAndUpdate(
      { _id: applicationId },
      updateData,
      { new: true }
    )
    if (result) res.status(200).json({ success: 1, ...result })
    else
      res
        .status(500)
        .json({ error: 1, message: "Sorry, something went wrong..." })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ error: 1, message: "Sorry, something went wrong..." })
  }
}

const editResponse = async (req, res) => {
  const { id } = req.params
  try {
    const updated = await Response.findByIdAndUpdate(id, {
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
//COMMENTS
const addComment = async (req, res) => {
  const { id, newComment } = req.body
  // update comments array
  try {
    const updated = await Response.findByIdAndUpdate(id, {
      $push: { comments: newComment },
    })
    if (!updated) await Promise.reject("UPDATE_FAILED")
    res.json({ message: "Comment has been added" })
  } catch (e) {
    if (e === "UPDATE_FAILED") {
      res.status(400).send({
        message: "we couldn't add your comment to this application",
      })
    } else {
      res.status(500).json({ message: "Sorry something went wrong" })
    }
  }
}
const getComments = async (req, res) => {
  const { id: response_id } = req.params
  try {
    const allComments = await Response.findById(response_id).populate({
      path: "comments.user",
      select: ["firstName", "lastName", "role", "avatar"],
    })
    if (!allComments) await Promise.reject("NOT_FOUND")
    res.json({ comments: allComments.comments })
  } catch (e) {
    console.log(e)

    if (e === "NOT_FOUND") {
      res.status(404).json({ message: "Sorry we couldn't find any comments" })
    } else {
      res.status(500).json({ message: "Something went wrong" })
    }
  }
}
const deleteComment = async (req, res) => {
  const { id, commentId } = req.params
  try {
    const updatedList = await Response.findByIdAndUpdate(
      id,
      {
        $pull: { comments: { _id: commentId } },
      },
      { new: true }
    )

    if (!updatedList) await Promise.reject("NOT_FOUND")
    res.json({
      message: "Comment has been deleted",
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
  addResponse,
  findAllResponse,
  findResponsesByStatus,
  updateStatus,
  updateNotified,
  editResponse,
  findResponseById,
  addComment,
  getComments,
  deleteComment,
}
