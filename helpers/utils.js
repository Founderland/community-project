const {check} = require('express-validator')
const {
    EMAIL_IS_EMPTY,
    EMAIL_IS_IN_WRONG_FORMAT,
    PASSWORD_IS_EMPTY,
    PASSWORD_LENGTH_MUST_BE_MORE_THAN_8,
  } = require('./constants')

const registerValidation = [
    check('email')
      .exists()
      .withMessage(EMAIL_IS_EMPTY)
      .isEmail()
      .withMessage(EMAIL_IS_IN_WRONG_FORMAT),
    check('password')
      .exists()
      .withMessage(PASSWORD_IS_EMPTY)
      .isLength({ min: 8 })
      .withMessage(PASSWORD_LENGTH_MUST_BE_MORE_THAN_8),
  ]

const loginValidation = [
    check('email')
      .exists()
      .withMessage(EMAIL_IS_EMPTY)
      .isEmail()
      .withMessage(EMAIL_IS_IN_WRONG_FORMAT),
    check('password')
      .exists()
      .withMessage(PASSWORD_IS_EMPTY)
      .isLength({ min: 8 })
      .withMessage(PASSWORD_LENGTH_MUST_BE_MORE_THAN_8),
  ]

const generateServerErrorCode = (
    res,
    code,
    fullError,
    msg,
    location = 'server'
  ) => {
    const errors = {}
    errors[location] = {
      fullError,
      msg,
    }
  
    return res.status(code).json({
      code,
      fullError,
      errors,
    })
  }

  module.exports = {
    registerValidation,
    loginValidation,
    generateServerErrorCode
  }