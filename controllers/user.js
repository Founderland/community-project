const { validationResult } = require("express-validator")
const User = require("../models/User")
const { generateHashedPassword, calculateToken } = require("../helpers/user")

const findAll = async (req, res) => {
  const users = await User.find({})
  if (users)
    res.status(200).json({
      data: users,
    })
}

const findOne = async (req, res, next) => {
  let { id } = req.params
  if (id === "user") {
    id = req.user.id
  }
  const profile = await User.findOne({ _id: id })
  if (profile) {
    profile["hashedPassword"] = ""
    if (req.originalUrl.includes("notify")) {
      return next()
    } else {
      res.status(200).json({
        data: profile,
      })
    }
  } else {
    res.status(404).json({
      message: "Profile not found",
    })
  }
}

const updateProfile = async (req, res) => {
  const { _id, firstName, lastName, avatar, role, password } = req.body
  if (_id) {
    const profile = {
      firstName,
      lastName,
      avatar,
      role,
    }
    if (password) {
      profile.hashedPassword = generateHashedPassword(password)
    }
    const updatedProfile = await User.findOneAndUpdate({ _id }, profile, {
      new: true,
    })
    if (updatedProfile) {
      updatedProfile["hashedPassword"] = ""
      res.status(200).json({
        data: updatedProfile,
      })
    } else {
      res.status(404).json({
        message: "Profile not found",
      })
    }
  } else {
    res.status(500).json({ message: "id not defined" })
  }
}

const addUser = async (req, res, next) => {
  const errorsAfterValidation = validationResult(req)
  const { firstName, lastName, email, role, avatar } = req.body
  try {
    if (!errorsAfterValidation.isEmpty()) {
      await Promise.reject("VALIDATION_FAILED")
    }
    const user = await User.findOne({ email })
    if (user) await Promise.reject("USER_EXISTS_ALREADY")
    const data = {
      firstName,
      lastName,
      email,
      avatar,
      role,
    }
    const newUser = await User.create(data)
    if (newUser) {
      req.unverified = newUser
      return next()
    } else {
      res.status(500).json({
        error: 500,
        message: "Sorry, something went wrong",
      })
    }
  } catch (e) {
    if (e === "USER_EXISTS_ALREADY") {
      res.status(403).json({
        error: 403,
        message: "Email already registered",
      })
    } else if (e === "VALIDATION_FAILED") {
      res.status(400).json({
        error: 400,
        message: errorsAfterValidation.mapped(),
      })
    } else {
      res.status(500).json({
        error: 500,
        message: "Sorry, something went wrong",
      })
    }
  }
}
const notifyUser = async (req, res, next) => {
  const { id } = req.body
  if (id) {
    try {
      const unverified = await User.findOne({ _id: id })
      if (unverified) {
        req.unverified = unverified
        return next()
      } else {
        res.status(404).json({ message: "User not found" })
      }
    } catch (e) {
      return next(e)
    }
  } else {
    res.status(500).json({ message: "id not defined" })
  }
}

module.exports = {
  findAll,
  findOne,
  updateProfile,
  addUser,
  notifyUser,
}
