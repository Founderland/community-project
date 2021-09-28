const formRouter = require('express').Router()
const foundersFormController = require('../controllers/foundersform')
const investorsForm = require('../controllers/investorsFormController')

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

module.exports = formRouter
