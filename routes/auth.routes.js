const authRouter = require('express').Router()
const authController = require('../controllers/auth')
const User = require('../controllers/user')
const bcrypt = require('bcrypt')
const { loginValidation } = require('../helpers/validators')
const passport = require('passport')

const isUser = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next()
	} else {
		res.status(401).json({ error: 401, message: 'Please login to access this data' })
	}
}

const isAdmin = (req, res, next) => {
	if ((req.isAuthenticated() && req.user.role === 'admin') || req.user.role === 'sadmin') {
		return next()
	} else {
		res.status(401).json({ error: 401, message: 'You are not authorized to view this data' })
	}
}

// Route to check if the user is logged in
authRouter.get('/verify', isUser, (req, res) => {
	req.user.hashedPassword = null
	res.send(req.user)
})

// Sending errors to client
authRouter.get('/errors', (req, res) => {
	res.send({ message: req.flash('error') })
})

// POST to Log-in
authRouter.post(
	'/log-in',
	passport.authenticate('local', {
		successRedirect: '/api/auth/verify',
		failureRedirect: '/api/auth/errors',
		failureFlash: true,
		passReqToCallback: true
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
