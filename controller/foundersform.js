const FoundersForm = require("../models/FoundersForm");

const addNew = async (req, res) => {
  const { category, question, rank, type, answers } = req.body;
  try {
    console.log(category, question, rank, type, answers);
    const newFoundersForm = await FoundersForm.create({
      category,
      question,
      rank,
      type,
      answers,
    });
    res.status(200).json(newFoundersForm);
  } catch (e) {
    console.log(e);
  }
};

const findAll = async (req, res) => {
  const result = await FoundersForm.find({});
  res.status(200).json(result);
};

module.exports = {
  addNew,
  findAll,
};
