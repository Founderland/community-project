const formRouter = require("express").Router()
const foundersForm = require("../controllers/foundersFormController")
const investorsForm = require("../controllers/investorsFormController")
const alliesForm = require("../controllers/alliesFormController")
const passport = require("passport")

// FOUNDERS

//ADD QUESTIONS TO FORM
formRouter.post(
  "/founder/add",
  passport.authenticate("jwt", { session: false }),
  foundersForm.addNew
)
//GET ALL QUESTIONS
formRouter.get("/founder/questions", foundersForm.findAll)
//GET QUESTION BY ID
formRouter.get("/founder/question/:id", foundersForm.findOne)
//EDIT QUESTION OR ANSWER
formRouter.put(
  "/founder/edit",
  passport.authenticate("jwt", { session: false }),
  foundersForm.editQuestion
)
//DELETE QUESTION
formRouter.delete(
  "/founder/delete/:question_id",
  passport.authenticate("jwt", { session: false }),
  foundersForm.deleteQuestion
)

// INVESTORS

//ADD QUESTIONS TO FORM
formRouter.post(
  "/investor/add",
  passport.authenticate("jwt", { session: false }),
  investorsForm.addNew
)
//GET ALL QUESTIONS
formRouter.get("/investor/questions", investorsForm.findAll)
//GET QUESTION BY ID
formRouter.get("/investor/question/:id", investorsForm.findOne)
//EDIT QUESTION + ANSWER
formRouter.put(
  "/investor/edit",
  passport.authenticate("jwt", { session: false }),
  investorsForm.editQuestion
)
//DELETE QUESTION
formRouter.delete(
  "/investor/delete/:question_id",
  passport.authenticate("jwt", { session: false }),
  investorsForm.deleteQuestion
)

// ALLIES

//ADD QUESTIONS TO FORM
formRouter.post(
  "/ally/add",
  passport.authenticate("jwt", { session: false }),
  alliesForm.addNew
)
//GET ALL QUESTIONS
formRouter.get("/ally/questions", alliesForm.findAll)
//GET QUESTION BY ID
formRouter.get("/ally/question/:id", alliesForm.findOne)
//EDIT QUESTION + ANSWER
formRouter.put(
  "/ally/edit",
  passport.authenticate("jwt", { session: false }),
  alliesForm.editQuestion
)
//DELETE QUESTION
formRouter.delete(
  "/ally/delete/:question_id",
  passport.authenticate("jwt", { session: false }),
  alliesForm.deleteQuestion
)

module.exports = formRouter
