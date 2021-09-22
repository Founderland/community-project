const authRouter = require('express').Router()
const authController = require('../controllers/auth')
const { loginValidation } = require('../helpers/utils')
const passport = require('passport')



module.exports = authRouter
