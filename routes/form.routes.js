const formRouter = require('express').Router()
const foundersForm = require('../controllers/foundersFormController')
const investorsForm = require('../controllers/investorsFormController')
const alliesForm = require('../controllers/alliesFormController')

// FOUNDERS

//ADD QUESTIONS TO FORM
formRouter.post('/founder/add', foundersForm.addNew)
//GET ALL QUESTIONS
formRouter.get('/founder/questions', foundersForm.findAll)
//ADD USER RESPONSE
formRouter.post('/founder/response', foundersForm.addResponse)
//GET USER RESPONSE
formRouter.get('/founder/response', foundersForm.findAllResponse)

// INVESTORS

//ADD QUESTIONS TO FORM
formRouter.post('/investor/add', investorsForm.addNew)
//GET ALL QUESTIONS
formRouter.get('/investor/questions', investorsForm.findAll)

// ALLIES

//ADD QUESTIONS TO FORM
formRouter.post('/ally/add', alliesForm.addNew)
//GET ALL QUESTIONS 
formRouter.get('/ally/questions', alliesForm.findAll)

module.exports = formRouter
