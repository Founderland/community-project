const { validationResult } = require('express-validator')
const User = require('../models/User')
const { generateHashedPassword, calculateToken } = require('../helpers/user')

const findAll = async (req, res) => {
    User.find({} ,(err, result) => {
        res.status(200).json({
          data: result,
        })
      })
  }

const addUser = async (req, res) => {
    const errorsAfterValidation = validationResult(req)
    if (!errorsAfterValidation.isEmpty()) {
      res.status(400).json({
        code: 400,
        errors: errorsAfterValidation.mapped(),
      })
    } else {
      try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
          const data = await {
                email,
                hashedPassword: generateHashedPassword(password),
              }
          const newUser = await User.create(data)
          delete newUser.hashedPassword;
          res.status(200).json(newUser);
        } else {
          res.status(403).json({
            code: 403,
            errors: 'USER_EXISTS_ALREADY',
          })
        }
      } catch (e) {
        res.status(500).json({
          code: 500,
          errors: 'SOME_THING_WENT_WRONG',
        })
      }
    }
  }


module.exports = {
    findAll,
    addUser,
}