const authRouter = require('express').Router()
const authController = require('../controllers/auth')
const { loginValidation } = require('../helpers/validators')
const passport = require('passport')



module.exports = authRouter
