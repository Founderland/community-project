const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()

const calculateToken = (email = "") => {
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

const generateHashedPassword = (password) => bcrypt.hashSync(password, 10)

module.exports = {
  calculateToken,
  generateHashedPassword,
}
