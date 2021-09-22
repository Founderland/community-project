const jwt = require('jsonwebtoken')
const sha256 = require('sha256')
require('dotenv').config()

const calculateToken = (userEmail = "") => {
    return jwt.sign({email: userEmail}, process.env.PRIVATE_KEY, {expiresIn: process.env.SESSION_EXPIRE})
}
const generateHashedPassword = password => sha256(password)

module.exports = {
    calculateToken,
    generateHashedPassword
} 
