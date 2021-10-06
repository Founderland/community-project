const { validationResult } = require('express-validator')
const User = require('../models/User')
const { generateHashedPassword, calculateToken } = require('../helpers/user')

const findAll = async (req, res) => {
  const users = await User.find({})
  if (users)
    res.status(200).json({
      data: users,
    })
}

const addUser = async (req, res, next) => {
  const errorsAfterValidation = validationResult(req)
  const { name, email, password, role } = req.body
  try {
    if (!errorsAfterValidation.isEmpty()) {
      await Promise.reject('VALIDATION_FAILED')
    }

    const user = await User.findOne({ email })
    if (user) await Promise.reject('USER_EXISTS_ALREADY')

    const data = {
      name,
      email,
      hashedPassword: generateHashedPassword(password),
      role,
    }
    const newUser = await User.create(data)

    res.status(200).json(newUser)
  } catch (e) {
    console.log(e)
    if (e === 'USER_EXISTS_ALREADY') {
      res.status(403).json({
        code: 403,
        errors: 'USER_EXISTS_ALREADY',
      })
    } else if (e === 'VALIDATION_FAILED') {
      res.status(400).json({
        code: 400,
        errors: errorsAfterValidation.mapped(),
      })
    } else {
      res.status(500).json({
        code: 500,
        errors: 'SOMETHING_WENT_WRONG',
      })
    }
  }
}

module.exports = {
  findAll,
  addUser,
}
