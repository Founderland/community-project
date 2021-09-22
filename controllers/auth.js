const User = require('../models/User')
require('dotenv').config()

const authenticateUser = async (email, password, done) => {
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return done(null, false, { message: 'User not found' })
    }
    const validate = await user.isValidPassword(password)
    if (!validate) {
      return done(null, false, { message: 'Wrong Password' })
    }
    return done(null, user, { message: 'Logged in Successfully' })
  } catch (error) {
    return done(error)
  }
}

module.exports = { authenticateUser }

