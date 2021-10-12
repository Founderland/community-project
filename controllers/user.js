const { validationResult } = require('express-validator')
const User = require('../models/User')
const { generateHashedPassword, calculateToken } = require('../helpers/user')

const findAll = async (req, res) => {
	const users = await User.find({})
	if (users)
		res.status(200).json({
			data: users
		})
}

const addUser = async (req, res, next) => {
	const errorsAfterValidation = validationResult(req)
	const { firstName, lastName, email, password, role, avatar } = req.body
	try {
		if (!errorsAfterValidation.isEmpty()) {
			await Promise.reject('VALIDATION_FAILED')
		}
		const user = await User.findOne({ email })
		if (user) await Promise.reject('USER_EXISTS_ALREADY')
		const data = {
			firstName,
			lastName,
			email,
			avatar,
			hashedPassword: generateHashedPassword(password),
			role
		}
		const newUser = await User.create(data)
		res.status(200).json({ success: 1, message: 'User saved' })
	} catch (e) {
		if (e === 'USER_EXISTS_ALREADY') {
			res.status(403).json({
				error: 403,
				message: 'Email already registered'
			})
		} else if (e === 'VALIDATION_FAILED') {
			res.status(400).json({
				error: 400,
				message: errorsAfterValidation.mapped()
			})
		} else {
			res.status(500).json({
				error: 500,
				message: 'Sorry, something went wrong'
			})
		}
	}
}

module.exports = {
	findAll,
	addUser
}
