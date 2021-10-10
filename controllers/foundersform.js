const FoundersForm = require('../models/FoundersForm')
const FoundersResponse = require('../models/FoundersFormResponse')

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
    res.status(200).json(newFoundersForm)
  } catch (e) {
    
    console.log(e)
    res.status(400).send(e)
  }
}

const findAll = async (req, res) => {
  const result = await FoundersForm.find({})
  res.status(200).json(result)
}

// Add Founders Response 

const addResponse = async (req, res) => {
   
  
  try {
    // console.log(
    //   question_id,
    //   answer,
    //   answerId
    // )
console.log(req.body)
 data.map(async(item)=> {
   const newFoundersResponse = await FoundersResponse.create({
   question_id:`${item. question_id}`,
   answer:`${item. question_id}`,
   answerId:`${item. answerId}`
    })
res.status(200).json(newFoundersResponse)
 })
}
catch (e) {
    console.log(e)
    res.status(400).send(e)
    }
  
  }





module.exports = {
  addNew,
  findAll,
  addResponse
}
