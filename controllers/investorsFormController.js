const InvestorsForm = require("../models/InvestorsForm")

const addNew = async (req, res) => {
  const { category, question, type, answers, categoryPage, mandatory } =
    req.body
  try {
    const newInvestorsForm = await InvestorsForm.create({
      category,
      categoryPage,
      question,
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

const editQuestion = async (req, res) => {
  const { _id: question_id } = req.body
  try {
    const updated = await InvestorsForm.findByIdAndUpdate(question_id, req.body)
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
    const deleted = await InvestorsForm.findByIdAndDelete(question_id)
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

const findAll = async (req, res) => {
  try {
    const result = await InvestorsForm.find({}).sort("category")
    res.status(200).json(result)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "Sorry something went wrong" })
  }
}

const findOne = async (req, res) => {
  const { id } = req.params
  try {
    const result = await InvestorsForm.findOne({ _id: id })
    res.status(200).json(result)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "Sorry, something went wrong" })
  }
}

module.exports = {
  addNew,
  findAll,
  findOne,
  editQuestion,
  deleteQuestion,
}
