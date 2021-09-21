const authRouter = require('express').Router()
const authController = require('../controllers/auth')

//Authenticate User
authRouter.get('/', authController.authenticateUser)

module.exports = authRouter
