const User = require('../models/User')
const userHelper = require('../helpers/user')

const authenticateUser = async (req, res) => {
    const { email, password } = req.body
   
}

module.exports = { authenticateUser }

