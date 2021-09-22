const User = require('../models/User')
const { validationResult } = require('express-validator')
const { generateServerErrorCode } = require('../helpers/utils')
const { SOME_THING_WENT_WRONG, WRONG_PASSWORD, USER_DOES_NOT_EXIST,} = require('../helpers/constants')
const { calculateToken } = require('../helpers/user')
require('dotenv').config()

const authenticateUser = async (req, res) => {
    const errorsAfterValidation = validationResult(req)
    if (!errorsAfterValidation.isEmpty()) {
      res.status(400).json({
        code: 400,
        errors: errorsAfterValidation.mapped(),
      });
    } else {
      try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (user && user.email) {
          const isPasswordMatched = user.comparePassword(password)
          if (isPasswordMatched) {
            const token = await calculateToken(user.email)
            const userToReturn = { ...user.toJSON(), ...{ token } }
            delete userToReturn.hashedPassword
            res.status(200).json(userToReturn)
          } else {
            generateServerErrorCode(
              res,
              403,
              'login password error',
              WRONG_PASSWORD,
              'password'
            )
          }
        } else {
          generateServerErrorCode(
            res,
            404,
            'login email error',
            USER_DOES_NOT_EXIST,
            'email'
          )
        }
      } catch (e) {
        generateServerErrorCode(res, 500, e, SOME_THING_WENT_WRONG)
      }
    }
  }


module.exports = { authenticateUser }

