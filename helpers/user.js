const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const calculateToken = (userEmail = "") => {
    return jwt.sign({email: userEmail}, process.env.PRIVATE_KEY, {expiresIn: process.env.SESSION_EXPIRE})
}

const generateHashedPassword = password => bcrypt.hash(password, 10)

module.exports = {
    calculateToken,
    generateHashedPassword
} 
