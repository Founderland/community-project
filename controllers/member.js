const { validationResult } = require("express-validator")
const Member = require("../models/Member")
const { generateHashedPassword, calculateToken } = require("../helpers/user")

const findAll = async (req, res) => {
  const { role } = req.params
  const members = await Member.find({ role: role })
  if (members) {
    res.status(200).json({
      data: members,
    })
  } else {
    res.status(500).json({
      message: "Sorry, something went wrong",
    })
  }
}

const findMember = async (req, res) => {
  const { _id } = req.user
  const profile = await Member.findOne({ _id })
  if (profile) {
    res.status(200).json({
      data: profile,
    })
  } else {
    res.status(500).json({
      message: "Sorry, something went wrong",
    })
  }
}

const addMember = async (req, res, next) => {
  const errorsAfterValidation = validationResult(req)
  const {
    firstName,
    lastName,
    title,
    email,
    city,
    country,
    role,
    connect,
    applicationId,
  } = req.body
  try {
    if (!errorsAfterValidation.isEmpty()) {
      throw new Error("VALIDATION_FAILED")
    }
    const existing = await Member.findOne({ email })
    if (existing) throw new Error("USER_EXISTS_ALREADY")
    let data = {
      firstName,
      lastName,
      title,
      email,
      city,
      country,
      role,
      applicationId,
    }
    const newMember = await Member.create(data)
    if (newMember) {
      req.newMember = newMember
      if (connect) {
        return next()
      } else {
        res.status(200).json({ success: 1, message: "User saved" })
      }
    } else throw new Error("DATABASE_ERROR")
  } catch (e) {
    if (e.message === "USER_EXISTS_ALREADY") {
      res.status(403).json({
        error: 403,
        message: "Email already registered",
      })
    } else if (e.message === "VALIDATION_FAILED") {
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

const confirmUser = async (req, res, next) => {
  const errorsAfterValidation = validationResult(req)
  const {
    firstName,
    lastName,
    password,
    title,
    city,
    geoLocation,
    photo,
    registrationToken,
    about,
  } = req.body
  try {
    if (!errorsAfterValidation.isEmpty()) {
      await Promise.reject("VALIDATION_FAILED")
    }
    const decoded = jwt.verify(registrationToken, process.env.JWT_KEY)
    if (!decoded.id) req.userData = decoded

    const user = await Member.findOne({ registrationToken })
    if (!user) await Promise.reject("INVALID_TOKEN")
    const data = {
      firstName,
      lastName,
      title,
      city,
      geoLocation,
      photo,
      password: generateHashedPassword(password),
      confirmed: Date.now,
      lastUpdate: Date.now,
      about,
    }
    const updateUser = await Member.findOneAndUpdate({}, data, {
      new: true,
    })
    //AFTER IT COMPLETES; IT NEEDS TO AUTHORIZE USER
    if (updateUser) res.status(200).json({ success: 1, message: "User saved" })
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
    } else if (e === "INVALID_TOKEN") {
      res.status(401).json({
        error: 401,
        message: "Unauthorized, invalid token",
      })
    } else {
      res.status(500).json({
        error: 500,
        message: "Sorry, something went wrong",
      })
    }
  }
}

const updateNotified = async (req, res) => {
  const { _id } = req.newMember
  const date = Date.now()
  const update = await Member.findOneAndUpdate(
    { _id },
    { notified: date },
    { new: true }
  )
  if (update) {
    res.status(200).json({ success: 1, message: "User notified" })
  } else {
    res.status(500).json({
      error: 1,
      message: "User notified but database not updated",
    })
  }
}

module.exports = {
  findAll,
  findMember,
  addMember,
  confirmUser,
  updateNotified,
}
