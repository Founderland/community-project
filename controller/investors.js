const InvestorsApplicant = require('../models/InvestorsApplicant')

//CURRENT STRUCTURE
//     question: {type: String, required: true},
//     answer: {type: String, required: true},
//     userId: {type: Number, required: true}, 

//FIND ALL INVESTORS APPLICANTS
const findAllInvestorsApplicants = async (req, res) => {
    try{
        const result = await InvestorsApplicant.find({})
        res.status(200).json(result)
    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Something went wrong...', details: err})
    }
}

//ADD NEW INVESTOR APPLICANT
const addInvestorsApplicant = async (req, res) => {
    const {question,answer,userId} = req.body
    try {
        if(!answer) return await Promise.reject("ANSWER_MISSING")
        const newApplicant = await InvestorsApplicant.create({
            question,
            answer,
            userId
        })
        res.status(200).json(newApplicant)
    } catch (err) {
        console.log(err)
        if(err === "ANSWER_MISSING"){
            res.status(404).json({ error: "Validation error", details: "Sorry you need to enter answer"})
        } else {
        res.status(500).json({ error: "Sorry something went wrong...", details: err})
        }
    }
}

module.exports = {
    findAllInvestorsApplicants,
    addInvestorsApplicant
}
