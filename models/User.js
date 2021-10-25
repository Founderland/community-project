const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  isLocked: {
    type: Boolean,
    required: true,
    default: false,
  },
  hashedPassword: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ["sadmin", "admin", "user"],
    required: true,
    default: "user",
  },
  avatar: {
    type: String,
    default: "bg-gradient-to-t from-red-300 to-red-500 bg-cover",
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
})

const User = mongoose.model("User", userSchema)

module.exports = User
