const router = require('express').Router()
const FoundersApplicant = require('../models/FoundersApplicant')
//     question: {type: String, required: true},
//     answer: {type: String, required: true},
//     userId: {type: Number, required: true}, 
//GET ALL FORM RESPONSE
router.get('/', async (req, res) => {
    try{
        const result = await FoundersApplicant.find({})
        res.send(result)
    }catch(err){
        console.log(err)
        res.status(500).send('something went wrong ')
    }
})

//ADD A NEW FORM RESPONSE
router.post('/', async (req, res) => {
const {question,answer,userId} = req.body
try{

if(!answer) return await Promise.reject("ANSWER_MISSING")

const newApplicant = await FoundersApplicant.create({
    question,
    answer,
    userId
})

res.status(200).send(newApplicant)

}catch (err){
console.log(err)
if(err === "ANSWER_MISSING"){
    res.status(404).send("Sorry you need to enter answer")
} else {
res.status(500).send("sorry something went wrong...")
}
}

})

module.exports = router