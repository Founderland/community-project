const router = require('express').Router()
const investorsController = require('../controller/investors')

//GET ALL FORM RESPONSE
router.get('/', investorsController.findAllInvestorsApplicants)

//ADD A NEW FORM RESPONSE
router.post('/', investorsController.addInvestorsApplicant)

module.exports = router
