const UserRouter = require('express').Router()
const userController = require('../controllers/user')
const passport = require('passport')
const { registerValidation } = require('../helpers/validators')


UserRouter.get('/users', passport.authenticate('jwt', { session: false }), userController.findAll)

// UserRouter.post('/register', registerValidation, userController.addNew)

module.exports = UserRouter
