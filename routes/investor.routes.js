const investorRouter = require('express').Router()
const investorController = require('../controllers/investor')

//GET ALL FORM RESPONSE
investorRouter.get('/', investorController.findAllInvestorApplicants)

//ADD A NEW FORM RESPONSE
investorRouter.post('/', investorController.addInvestorApplicant)

module.exports = investorRouter
