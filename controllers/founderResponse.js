// const FounderApplicant = require('../models/FounderApplicant')
const FoundersResponse = require("../models/FoundersFormResponse")

// Add Founders Response

const addResponse = async (req, res) => {
  const { firstName, lastName, totalScore, answerData } = req.body
  try {
    //  data.map(async (item) => {
    const newFoundersResponse = await FoundersResponse.create({
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

    if (!newFoundersResponse) {
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
    const result = await FoundersResponse.find({})
    // .populate({ path: 'answerData.question_id', select: ['question', 'category', 'type', 'rank'] })

    // console.log(result)
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
  }
}

// Update Founders Status
const updateStatus = async (req, res) => {
  const { status, id } = req.params
  try {
    const result = await FoundersResponse.findByIdAndUpdate(
      id,
      {
        status: status,
        evaluatedOn: Date.now(),
      },
      { new: true }
    )

    // console.log(result)
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
  }
}

const findResponsesByStatus = async (req, res) => {
  const { status } = req.params
  try {
    const result = await FoundersResponse.find({ status: status }).sort({
      totalScore: "desc", //order responses by score
    })
    // .populate({ path: 'answerData.question_id', select: ['question', 'category', 'type', 'rank'] })

    // console.log(result)
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
  }
}

const editResponse = async (req, res) => {
  const { id, score } = req.params
  try {
    const updated = await FoundersResponse.findByIdAndUpdate(id, {
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
}
