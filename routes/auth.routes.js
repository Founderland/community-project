const authRouter = require('express').Router()
const authController = require('../controllers/auth')
const User = require('../controllers/user')
const bcrypt = require('bcrypt')
const { registerValidation } = require('../helpers/validators')
const passport = require('passport')

const isUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    } else {
        res.send({ message: 'Please log-in' })
    }
}

const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        return next()
    } else {
        res.send({ message: 'Your not an admin' })
    }
}

// Route to check if the user is logged in
authRouter.get('/verify', isUser, (req, res) => {
    res.send(req.user)
})

// Sending errors to client
authRouter.get('/errors', (req, res) => {
    res.send({ message: req.flash('error') })
})

// POST to sign-up
authRouter.post('/sign-up', registerValidation, async (req, res) => {
    const { username, password, userType } = req.body

    const hashedPassword = bcrypt.hashSync(password, 10)
    console.log('hashed', hashedPassword)
    User.addUser(req, res)

    console.log(username, password)
})

// POST to Log-in
authRouter.post(
    '/log-in',
    passport.authenticate('local', {
        successRedirect: '/api/auth/verify',
        failureRedirect: '/api/auth/errors',
        failureFlash: true,
        passReqToCallback: true,
    })
)

// POST to Log-out
authRouter.post('/log-out', (req, res) => {
    req.logOut()
    res.redirect('/api/auth/verify')
})

authRouter.get('/verifyAdmin', isAdmin, (req, res) => {
    res.send(req.user)
})

module.exports = { authRouter, isUser, isAdmin }
