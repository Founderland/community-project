const UserRouter = require('express').Router()
const userController = require('../controllers/user')
const {registerValidation} = require('../helpers/validators')


UserRouter.get('/view', userController.findAll)

UserRouter.post('/register', registerValidation, userController.addUser)

module.exports = UserRouter
