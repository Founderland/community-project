const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
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
  companyName: {
    type: String,
    trim: true,
  },
  companyBio: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  geoLocation: [{ type: Number }],
  businessArea: { type: String, trim: true },
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Valid email address required"],
    required: "Email is required",
  },
  about: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    enum: ["founder", "investor", "ally"],
    required: true,
    default: "ally",
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  hashedPassword: { type: String },
  created: {
    type: Date,
    default: Date.now(),
  },
  confirmed: { type: Date, default: null },
  applicationId: { type: mongoose.Schema.ObjectId },
  notified: { type: Date, default: null },
  lastUpdate: { type: Date },
  locked: { type: Boolean, default: false },
  following: [{ type: mongoose.Schema.ObjectId, ref: "Member" }],
  followers: [{ type: mongoose.Schema.ObjectId, ref: "Member" }],
})

const Member = mongoose.model("Member", userSchema)

module.exports = Member
