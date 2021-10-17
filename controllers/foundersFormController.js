const { response } = require("express")
const FoundersForm = require("../models/FoundersForm")
const FoundersResponse = require("../models/FoundersFormResponse")
const { connect } = require("../routes/founder.routes")

const addNew = async (req, res) => {
  const { category, question, rank, type, answers, categoryPage, mandatory } =
    req.body
  try {
    console.log(
      category,
      question,
      rank,
      type,
      answers,
      categoryPage,
      mandatory
    )
    const newFoundersForm = await FoundersForm.create({
      category,
      categoryPage,
      question,
      rank,
      type,
      mandatory,
      answers,
    })
    res.json({ message: "New question successfully added" })
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

const findAll = async (req, res) => {
  try {
    const result = await FoundersForm.find({}).sort("category")
    res.status(200).json(result)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "Sorry something went wrong" })
  }
}

// Edit existing question + answer
const editQuestion = async (req, res) => {
  const { _id: question_id } = req.body
  try {
    const updated = await FoundersForm.findByIdAndUpdate(question_id, req.body)
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

const deleteQuestion = async (req, res) => {
  const { question_id } = req.params
  try {
    const deleted = await FoundersForm.findByIdAndDelete(question_id)
    if (!deleted) await Promise.reject("NOT_FOUND")
    res.json({ message: "Question deleted successfully" })
  } catch (e) {
    if (e === "NOT_FOUND") {
      res.status(404).json({ message: "Question no longer in the database" })
    } else {
      res.status(500).json({ message: "Sorry something went wrong" })
    }
  }
}
// Add Founders Response

const addResponse = async (req, res) => {
  const { firstName, lastName, totalScore, answerData } = req.body
  console.log(answerData)
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

const updateStatus = async (req, res) => {
  const { status, id } = req.params
  try {
    const result = await FoundersResponse.findByIdAndUpdate(
      id,
      {
        status: status,
      },
      { new: true }
    )

    // console.log(result)
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  addNew,
  findAll,
  addResponse,
  findAllResponse,
  editQuestion,
  deleteQuestion,
  findResponsesByStatus,
  updateStatus,
}
