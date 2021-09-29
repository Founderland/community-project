const AlliesForm = require('../models/AlliesForm')

const addNew = async (req, res) => {
    const { category, question, rank, type, answers, categoryPage } = req.body
    try {
        const newInvestorsForm = await InvestorsForm.create({
            category,
            categoryPage,
            question,
            type,
            answers,
        })
        res.status(200).json(newInvestorsForm)
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
