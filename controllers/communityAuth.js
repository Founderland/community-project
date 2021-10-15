require("dotenv").config()
const Member = require("../models/Member")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const authenticateUser = async (username, password, done) => {
  try {
    // Check that user exists by email
    const user = await Member.findOne({ email: username })
    if (user && (await bcrypt.compare(password, user.hashedPassword))) {
      delete user.hashedPassword
      done(null, user, { message: "Successful" })
    } else {
      done(null, false, { message: "Wrong Credentials" })
    }
  } catch (err) {
    done(null, false, { message: "Database Error" })
  }
}

const authorizeUser = (req, res) => {
  if (req.user.id) {
    const payload = {
      id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      photo: req.user.avatar,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    })
    return res.status(200).json({
      access_token: token,
      token_type: "bearer",
      expires: process.env.JWT_EXPIRE,
    })
  } else {
    res.status(401).json({ message: "wrong credentials" })
  }
}

module.exports = { authenticateUser, authorizeUser }
