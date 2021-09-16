const router = require('express').Router()
const foundersController = require('../controller/founders')

//GET ALL FORM RESPONSE
router.get('/', foundersController.findAllFoundersApplicants)

//ADD A NEW FORM RESPONSE
router.post('/', foundersController.addFoundersApplicant)

module.exports = router
