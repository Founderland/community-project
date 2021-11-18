require("dotenv").config()
const { validationResult } = require("express-validator")
const Member = require("../models/Member")
const Response = require("../models/Response")

const { generateHashedPassword, calculateToken } = require("../helpers/user")
const jwt = require("jsonwebtoken")
const { Mongoose } = require("mongoose")

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

const findMember = async (req, res, next) => {
  const id = req.params.id
  const profile = await Member.findOne({ _id: id }).lean()
  if (profile) {
    delete profile.hashedPassword
    if (req.originalUrl.includes("notify")) {
      req.newMember = profile
      return next()
    } else {
      res.status(200).json({
        data: profile,
      })
    }
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
    companyName,
    businessArea,
    role,
    connect,
    applicationId,
  } = req.body
  try {
    if (!errorsAfterValidation.isEmpty()) {
      throw new Error("VALIDATION_FAILED")
    }
    const existing = await Member.findOne({ email })
    if (existing) await Promise.reject(new Error("USER_EXISTS_ALREADY"))
    let data = {
      firstName,
      lastName,
      title,
      email,
      city,
      country,
      companyName,
      businessArea,
      role,
      applicationId,
    }
    let newMember = await Member.create(data)
    if (newMember) {
      req.newMember = newMember
      if (connect) return next()
      res.status(200).json({ success: 1, member: newMember })
    } else await Promise.reject(new Error("DATABASE_ERROR"))
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
    } else if (e.message === "NOT_FOUND") {
      res.status(400).json({
        error: 400,
        message: "Member created but response failed to update",
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
    country,
    businessArea,
    geoLocation,
    photo,
    bio,
    companyName,
    companyBio,
    companyLink,
  } = req.body
  try {
    if (!errorsAfterValidation.isEmpty()) {
      await Promise.reject("VALIDATION_FAILED")
    }
    const data = {
      firstName,
      lastName,
      title,
      city,
      country,
      businessArea,
      geoLocation,
      photo,
      hashedPassword: generateHashedPassword(password),
      confirmed: Date.now(),
      lastUpdate: Date.now(),
      bio,
      companyName,
      companyBio,
      companyLink,
    }
    const updateUser = await Member.findOneAndUpdate(
      { _id: req.user.id },
      data,
      {
        new: true,
      }
    )
    //AFTER IT COMPLETES; IT NEEDS TO AUTHORIZE USER
    if (!updateUser) await Promise.reject("UPDATE_FAILED")

    return next()
  } catch (e) {
    console.log(e)
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
    } else if (e === "UPDATE_FAILED") {
      res.status(400).json({
        error: 400,
        message: "User update failed",
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
    update.hashedPassword = ""
    res.status(200).json({ success: 1, message: "User notified", data: update })
  } else {
    res.status(500).json({
      error: 1,
      message: "User notified but database not updated",
    })
  }
}

const lockProfile = async (req, res) => {
  const { _id, locked } = req.body
  if (_id) {
    const profile = {
      locked,
    }
    const updatedProfile = await Member.findOneAndUpdate({ _id }, profile, {
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

const updateMember = async (req, res) => {
  const { _id } = req.body
  try {
    const update = await Member.findByIdAndUpdate(
      _id,
      { ...req.body, lastUpdate: Date.now() },
      { new: true }
    )
    if (update) {
      update.hashedPassword = ""
      res
        .status(200)
        .json({ success: 1, message: "User updated", data: update })
    } else {
      res.status(500).json({
        error: 1,
        message: "Something went wrong",
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 1,
      message: "Something went wrong",
    })
  }
}

module.exports = {
  findAll,
  findMember,
  addMember,
  confirmUser,
  updateNotified,
  lockProfile,
  updateMember,
}
