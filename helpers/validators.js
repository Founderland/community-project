const { check } = require('express-validator')

const registerValidation = [
	check('firstName').exists().withMessage('First name missing'),
	check('lastName').exists().withMessage('Last name missing'),
	check('email').exists().withMessage('Email missing').isEmail().withMessage('Invalid email'),
	check('role').exists().withMessage('Role missing'),
	check('password').exists().withMessage('Password missing').isLength({ min: 8 }).withMessage('Password too short')
]

const loginValidation = [
	check('email').exists().withMessage('EMAIL_IS_EMPTY').isEmail().withMessage('EMAIL_IS_IN_WRONG_FORMAT'),
	check('password').exists().withMessage('PASSWORD_IS_EMPTY').isLength({ min: 8 }).withMessage('PASSWORD_LENGTH_MUST_BE_MORE_THAN_7')
]

module.exports = {
	registerValidation,
	loginValidation
}
