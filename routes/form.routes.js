const formRouter = require('express').Router()
const foundersFormController = require('../controllers/foundersform')
const investorsForm = require('../controllers/investorsFormController')
const alliesForm = require('../controllers/alliesFormController')

// FOUNDERS

//ADD QUESTIONS TO FORM
formRouter.post('/founder/add', foundersFormController.addNew)
//GET ALL QUESTIONS
formRouter.get('/founder/questions', foundersFormController.findAll)

// INVESTORS

//ADD QUESTIONS TO FORM
formRouter.post('/investor/add', investorsForm.addNew)
//GET ALL QUESTIONS
formRouter.get('/investor/questions', investorsForm.findAll)

// ALLIES

//ADD QUESTIONS TO FORM
formRouter.post('/investor/add', alliesForm.addNew)
//GET ALL QUESTIONS
formRouter.get('/investor/questions', alliesForm.findAll)

module.exports = formRouter
