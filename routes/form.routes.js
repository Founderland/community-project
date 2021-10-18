const formRouter = require("express").Router()
const foundersForm = require("../controllers/foundersFormController")

const investorsForm = require("../controllers/investorsFormController")
const alliesForm = require("../controllers/alliesFormController")

// FOUNDERS

//ADD QUESTIONS TO FORM
formRouter.post("/founder/add", foundersForm.addNew)
//GET ALL QUESTIONS
formRouter.get("/founder/questions", foundersForm.findAll)
//EDIT QUESTION OR ANSWER
formRouter.put("/founder/edit", foundersForm.editQuestion)
//DELETE QUESTION
formRouter.delete("/founder/delete/:question_id", foundersForm.deleteQuestion)



// INVESTORS

//ADD QUESTIONS TO FORM
formRouter.post("/investor/add", investorsForm.addNew)
//GET ALL QUESTIONS
formRouter.get("/investor/questions", investorsForm.findAll)
//EDIT QUESTION + ANSWER
formRouter.put("/investor/edit", investorsForm.editQuestion)
//DELETE QUESTION
formRouter.delete("/investor/delete/:question_id", investorsForm.deleteQuestion)

// ALLIES

//ADD QUESTIONS TO FORM
formRouter.post("/ally/add", alliesForm.addNew)
//GET ALL QUESTIONS
formRouter.get("/ally/questions", alliesForm.findAll)
//EDIT QUESTION + ANSWER
formRouter.put("/ally/edit", alliesForm.editQuestion)
//DELETE QUESTION
formRouter.delete("/ally/delete/:question_id", alliesForm.deleteQuestion)

module.exports = formRouter
