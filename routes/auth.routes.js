const authRouter = require('express').Router()
const authController = require('../controllers/auth')
const { loginValidation } = require('../helpers/utils')
const passport = require('passport')

//Authenticate User
authRouter.post('/login', loginValidation, authController.authenticateUser)

//VERIFY USER
authRouter.post('/verify', passport.authenticate('jwt', { session: false }), authController.authenticateUser)


module.exports = authRouter
