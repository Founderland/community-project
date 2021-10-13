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

const findAll = async (req, res) => {
  const result = await AlliesForm.find({})
  res.status(200).json(result)
}

module.exports = {
  addNew,
  findAll,
}
