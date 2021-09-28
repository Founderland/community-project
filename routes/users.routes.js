const UserRouter = require('express').Router()
const userController = require('../controllers/user')
const passport = require('passport')
const { isAdmin } = require('./auth.routes')

const { registerValidation } = require('../helpers/validators')

// UserRouter.get(
//   "/all",
//   passport.authenticate("jwt", { session: false }),
//   userController.findAll
// );

UserRouter.post('/register', registerValidation, userController.addUser)

UserRouter.get('/all', userController.findAll)

UserRouter.get('/test', isAdmin, (req, res) => {
    res.send(req.user)
})

module.exports = UserRouter
