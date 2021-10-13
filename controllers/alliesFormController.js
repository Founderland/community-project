const AlliesForm = require("../models/AlliesForm")

const addNew = async (req, res) => {
  const { category, question, type, answers, categoryPage, mandatory } =
    req.body
  try {
    const newAlliesForm = await AlliesForm.create({
      category,
      categoryPage,
      question,
      type,
      mandatory,
      answers,
    })
    res.status(200).json(newAlliesForm)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

const editQuestion = async (req, res) => {
  const { _id: question_id } = req.body
  try {
    const updated = await AlliesForm.findByIdAndUpdate(question_id, req.body)

    res.json({ message: "Update successful" })
  } catch (e) {
    res.status(500).json({ message: "Sorry something went wrong" })
  }
}

const deleteQuestion = async (req, res) => {
  const { question_id } = req.params
  try {
    const deleted = await AlliesForm.findByIdAndDelete(question_id)

    res.json({ message: "Question deleted successfully" })
  } catch (e) {
    res.status(500).json({ message: "Sorry something went wrong" })
  }
}

const findAll = async (req, res) => {
  const result = await AlliesForm.find({})
  res.status(200).json(result)
}

module.exports = {
  addNew,
  findAll,
  editQuestion,
  deleteQuestion,
}
