const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: "First Name is required",
  },
  lastName: {
    type: String,
    trim: true,
    required: "Last Name is required",
  },
  title: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  geoLocation: [{ type: Number }],
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Valid email address required"],
    required: "Email is required",
  },
  hashed_password: { type: String },
  created: {
    type: Date,
    default: Date.now,
  },
  confirmed: { type: Date },
  lastUpdate: { type: Date },
  about: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    enum: ["Founder", "Investor", "Ally"],
    required: true,
    default: "Ally",
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  following: [{ type: mongoose.Schema.ObjectId, ref: "CommunityUser" }],
  followers: [{ type: mongoose.Schema.ObjectId, ref: "CommunityUser" }],
  applicationId: { type: mongoose.Schema.ObjectId },
  registrationToken: { type: String },
})

const CommunityUser = mongoose.model("CommunityUser", userSchema)

module.exports = CommunityUser
