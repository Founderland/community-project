// const FounderApplicant = require('../models/FounderApplicant')
const Response = require("../models/Response")

// Add Founders Response

const addResponse = async (req, res) => {
  const { firstName, lastName, totalScore, answerData } = req.body
  try {
    //  data.map(async (item) => {
    const newResponse = await Response.create({
      firstName,
      lastName,
      totalScore,
      answerData,
    })

    // {
    //   // question_id: `${item.question_id}`,
    //   // answerId: `${item.answer_id}`,
    //   // score : `${item.score}`
    // }

    if (!newResponse) {
      await Promise.reject("founder response error") //reject promise with error
    }
    // })

    return res.status(200).json("Succesful attempt")
  } catch (e) {
    if (e === "founder response error") {
      console.log("founder response error")
    } else {
      console.log(e)
      return res.status(404).json({ e })
    }
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

// Update Founders Status
const updateStatus = async (req, res) => {
  const { status, id } = req.params
  try {
    const result = await Response.findByIdAndUpdate(
      id,
      {
        status: status,
        evaluatedOn: Date.now(),
      },
      { new: true }
    )
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
  }
}

const findResponsesByStatus = async (req, res) => {
  const { status, role } = req.params
  try {
    if (status && role) {
      const result = await Response.find({ status, role }).sort({
        totalScore: "desc", //order responses by score
      })
      // .populate({ path: 'answerData.question_id', select: ['question', 'category', 'type', 'rank'] })

      // console.log(result)
      res.status(200).json(result)
    } else {
      const result = await Response.find({ status }).sort({
        totalScore: "desc", //order responses by score
      })
      // .populate({ path: 'answerData.question_id', select: ['question', 'category', 'type', 'rank'] })

      // console.log(result)
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

const editResponse = async (req, res) => {
  const { id, score } = req.params
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

module.exports = {
  addResponse,
  findAllResponse,
  findResponsesByStatus,
  updateStatus,
  editResponse,
  findResponseById,
}
