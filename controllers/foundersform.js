const FoundersForm = require('../models/FoundersForm')
const FoundersResponse = require('../models/FoundersFormResponse')
const { connect } = require('../routes/founder.routes')

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
  const {applicantName,totalScore,answerData} = req.body
console.log(answerData,"DATA")
  try {
  //  data.map(async (item) => {
    const newFoundersResponse = await FoundersResponse.create({ applicantName,totalScore,answerData })

      // {
      //   // question_id: `${item.question_id}`,
      //   // answerId: `${item.answer_id}`,
      //   // score : `${item.score}`
      // }
    
    
      if (!newFoundersResponse) {
        await Promise.reject('founder response error') //reject promise with error
      }
    // })

    return res.status(200).json('Succesful attempt')
  } catch (e) {
    if (e === 'founder response error') {
      console.log('founder response error')
    } else {
      console.log(e)
      return res.status(404).json({ e })
    }
  }
}


// Find Founders Response

const findAllResponse = async (req, res) => {

  try {
    const result = await FoundersResponse.find({}).populate({ path: 'question_id', select:['question','category','type']})

    console.log(result)
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
  }
}


module.exports = {
  addNew,
  findAll,
  addResponse,
  findAllResponse
}
