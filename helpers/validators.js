const { check } = require('express-validator')

const registerValidation = [
  check('name')
    .exists()
    .withMessage('NAME_IS_EMPTY')
    .isLength({ min: 6 })
    .withMessage('NAME_TOO_SHORT'),
  check('email')
    .exists()
    .withMessage('EMAIL_IS_EMPTY')
    .isEmail()
    .withMessage('EMAIL_IS_IN_WRONG_FORMAT'),
  check('password')
    .exists()
    .withMessage('PASSWORD_IS_EMPTY')
    .isLength({ min: 8 })
    .withMessage('PASSWORD_LENGTH_MUST_BE_MORE_THAN_7'),
]

const loginValidation = [
  check('email')
    .exists()
    .withMessage('EMAIL_IS_EMPTY')
    .isEmail()
    .withMessage('EMAIL_IS_IN_WRONG_FORMAT'),
  check('password')
    .exists()
    .withMessage('PASSWORD_IS_EMPTY')
    .isLength({ min: 8 })
    .withMessage('PASSWORD_LENGTH_MUST_BE_MORE_THAN_7'),
]

module.exports = {
  registerValidation,
  loginValidation,
}
