const router = require('express').Router()
const founderController = require('../controller/founder')

//GET ALL FORM RESPONSE
router.get('/', founderController.findAllFounderApplicants)

//ADD A NEW FORM RESPONSE
router.post('/', founderController.addFounderApplicant)

module.exports = router
