const router = require('express').Router()
const investorController = require('../controllers/investor')

//GET ALL FORM RESPONSE
router.get('/', investorController.findAllInvestorApplicants)

//ADD A NEW FORM RESPONSE
router.post('/', investorController.addInvestorApplicant)

module.exports = router
