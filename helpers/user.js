const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1
}

const hashPassword = (plainPassword) => {
    return argon2.hash(plainPassword, hashingOptions)
}

const verifyPassword = (plainPassword, hashedPassword) => {
    return argon2.verify(hashedPassword, plainPassword, hashingOptions)
}

const calculateToken = (userEmail = "") => {
    return jwt.sign({email: userEmail}, process.env.PRIVATE_KEY)
}

module.exports = { 
    hashPassword,
    verifyPassword,
    calculateToken,
}