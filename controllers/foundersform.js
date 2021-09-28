const FoundersForm = require("../models/FoundersForm");

const addNew = async (req, res) => {
  const { category, question, rank, type, answers, categoryPage } = req.body;
  try {
    console.log(category, question, rank, type, answers, categoryPage);
    const newFoundersForm = await FoundersForm.create({
      category,
      categoryPage,
      question,
      rank,
      type,
      answers,
    });
    res.status(200).json(newFoundersForm);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
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
