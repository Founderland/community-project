const { validationResult } = require("express-validator")
const CommunityUser = require("../models/CommunityUser")
const { generateHashedPassword, calculateToken } = require("../helpers/user")

const findAll = async (req, res) => {
  const users = await CommunityUser.find({})
  if (users)
    res.status(200).json({
      data: users,
    })
}

const addUser = async (req, res, next) => {
  const errorsAfterValidation = validationResult(req)
  const { firstName, lastName, email, role, applicationId } = req.body
  try {
    if (!errorsAfterValidation.isEmpty()) {
      await Promise.reject("VALIDATION_FAILED")
    }
    const user = await CommunityUser.findOne({ email })
    if (user) await Promise.reject("USER_EXISTS_ALREADY")
    const data = {
      firstName,
      lastName,
      email,
      applicationId,
      registrationToken: calculateToken(email),
      role,
    }
    const newUser = await CommunityUser.create(data)
    if (newUser) res.status(200).json({ success: 1, message: "User saved" })
    else await Promise.reject("DATABASE_ERROR")
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
    req.userData = decoded

    const user = await CommunityUser.findOne({ registrationToken })
    if (!user) await Promise.reject("INVALID_TOKEN")
    const data = {
      firstName,
      lastName,
      title,
      city,
      geoLocation,
      photo,
      password: generateHashedPassword(password),
      registrationToken: "",
      confirmed: Date.now,
      lastUpdate: Date.now,
      about,
    }
    const updateUser = await CommunityUser.findOneAndUpdate({}, data, {
      new: true,
    })
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

module.exports = {
  findAll,
  addUser,
  confirmUser,
}
