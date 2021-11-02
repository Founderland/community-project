require("dotenv").config()
const User = require("../models/User")
const Member = require("../models/Member")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { generateHashedPassword } = require("../helpers/user")

const authenticateUser = async (username, password, done) => {
  //NEEDS TO BE ADAPTED TO CHECK BOTH ON COMMUNITY AND ADMIN
  try {
    // Check that user exists by email
    const user = await User.findOne({ email: username })
    if (user && (await bcrypt.compare(password, user.hashedPassword))) {
      delete user.hashedPassword
      if (user.isVerified && !user.isLocked) {
        done(null, user, { message: "Successful" })
      } else {
        done(null, false, { message: "User unverified or locked" })
      }
    } else {
      const user = await Member.findOne({ email: username })
      if (user && (await bcrypt.compare(password, user.hashedPassword))) {
        delete user.hashedPassword
        if (user.confirmed && !user.locked) {
          done(null, user, { message: "Successful" })
        } else {
          done(null, false, { message: "User unverified or locked" })
        }
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
  User.findOne({ _id: payload.id, email: payload.email }, (err, user) => {
    if (err) {
      return done(err, false)
    }
    if (user) {
      return done(null, user)
    } else {
      Member.findOne({ _id: payload.id, email: payload.email }, (err, user) => {
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

const verifyEmailAndUpdatePass = async (req, res, next) => {
  //TO UPDATE USER FOR VERIFIED EMAIL
  const { id, password, confirmPassword, isAdmin } = req.body
  if (id) {
    let updatedProfile
    const profile = {
      hashedPassword: generateHashedPassword(password),
      isVerified: true,
    }
    if (isAdmin) {
      updatedProfile = await User.findByIdAndUpdate(id, profile, {
        new: true,
      })
    } else {
      updatedProfile = await Member.findByIdAndUpdate(id, profile, {
        new: true,
      })
    }

    if (updatedProfile) {
      return next()
    } else {
      res.status(404).json({
        message: "Profile not found",
      })
    }
  } else {
    res.status(500).json({ message: "id not defined" })
  }
}

const authorizeUser = async (req, res) => {
  //CAN BE USED TO PROVIDED TOKENS BOTH TO COMMUNITY AND ADMIN - BUT PAYLOAD MIGHT BE DIFFERENT
  if (req.user._id) {
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
        role: req.user.role,
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

// FIND USER BY MAIL TO TRIGGER PASS RESET
const findUserOrMember = async (req, res, next) => {
  const { email, isAdmin } = req.body
  try {
    if (isAdmin) {
      const user = await User.findOne({ email: email })
      if (!user) await Promise.reject("NOT_FOUND")
      if (!user.isLocked) {
        req.user = user
        return next()
      } else {
        res.status(401).json({ message: "User is locked" })
      }
    } else {
      const user = await Member.findOne({ email: email })
      if (!user) await Promise.reject("NOT_FOUND")
      if (user.confirmed && !user.locked) {
        req.user = user
        return next()
      } else {
        res.status(401).json({ message: "User unverified or locked" })
      }
    }
  } catch (err) {
    if (err === "NOT_FOUND") {
      res.status(404).json({ message: "User not found" })
    } else {
      res.status(500).json({ message: "Database Error" })
    }
  }
}

module.exports = {
  authenticateUser,
  isAuthorized,
  authorizeUser,
  verifyEmailAndUpdatePass,
  findUserOrMember,
}
