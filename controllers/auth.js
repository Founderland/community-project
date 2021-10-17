require("dotenv").config()
const User = require("../models/User")
const Member = require("../models/Member")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const authenticateUser = async (username, password, done) => {
  //NEEDS TO BE ADAPTED TO CHECK BOTH ON COMMUNITY AND ADMIN
  try {
    // Check that user exists by email
    const user = await User.findOne({ email: username })
    if (user && (await bcrypt.compare(password, user.hashedPassword))) {
      delete user.hashedPassword
      done(null, user, { message: "Successful" })
    } else {
      user = await Member.findOne({ email: username })
      if (user && (await bcrypt.compare(password, user.hashedPassword))) {
        delete user.hashedPassword
        done(null, user, { message: "Successful" })
      } else {
        done(null, false, { message: "Wrong Credentials" })
      }
    }
  } catch (err) {
    done(null, false, { message: "Database Error" })
  }
}

const isAuthorized = async (payload, done) => {
  //CHECK TOKEN FROM BOTH COMMUNITY AND ADMIN
  User.findOne({ id: payload.id, email: payload.email }, (err, user) => {
    if (err) {
      return done(err, false)
    }
    if (user) {
      return done(null, user)
    } else {
      Member.findOne({ id: payload.id, email: payload.email }, (err, user) => {
        console.log(err)
        if (err) {
          return done(err, false)
        }
        if (user) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      })
    }
  })
}

const authorizeUser = async (req, res) => {
  //CAN BE USED TO PROVIDED TOKENS BOTH TO COMMUNITY AND ADMIN - BUT PAYLOAD MIGHT BE DIFFERENT
  if (req.user.id) {
    let payload = {}
    //MAKE A DIFFERENTE PAYLOAD FOR COMMUNITY
    if (req.user.avatar) {
      payload = {
        id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        avatar: req.user.avatar,
        role: req.user.role,
        email: req.user.email,
      }
    } else {
      payload = {
        id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
      }
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

module.exports = { authenticateUser, isAuthorized, authorizeUser }
