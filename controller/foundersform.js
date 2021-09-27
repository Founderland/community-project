const FoundersForm = require("../models/FoundersForm");

const addNew = async (req, res) => {
  const { category, question, rank, type, answers, categoryPage } = req.body;
  try {
    console.log(category, question, rank, type, answers, categoryPage);
    const newFoundersForm = await FoundersForm.create({
      category,
      question,
      rank,
      type,
      answers,
      categoryPage
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
