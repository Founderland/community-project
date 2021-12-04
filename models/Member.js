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
  businessArea: { type: String, trim: true },
  geoLocation: { lat: { type: Number }, lng: { type: Number } },
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Valid email address required"],
    required: "Email is required",
  },
  hashedPassword: { type: String },

  bio: {
    type: String,
    trim: true,
  },
  companyName: { type: String, trim: true },
  companyBio: { type: String, trim: true },
  companyLink: { type: String, trim: true },
  role: {
    type: String,
    enum: ["founder", "investor", "ally"],
    required: true,
    default: "ally",
  },
  photo: {
    public_id: { type: String },
    url: {
      type: String,
      default:
        "https://res.cloudinary.com/founderland/image/upload/v1636210452/default_image_btevla.jpg",
    },
  },
  hashedPassword: { type: String },
  created: {
    type: Date,
    default: Date.now(),
  },
  applicationId: { type: mongoose.Schema.ObjectId },
  created: {
    type: Date,
    default: Date.now(),
  },
  confirmed: { type: Date, default: null },
  notified: { type: Date, default: null },
  lastUpdate: { type: Date },
  events: {
    hosted: [
      {
        id: { type: mongoose.Schema.ObjectId, ref: "Event" },
        title: { type: String },
      },
    ],
    attended: [
      {
        id: { type: mongoose.Schema.ObjectId, ref: "Event" },
        title: { type: String },
      },
    ],
  },
  socialmedia: {
    linkedin: { type: String, default: null },
    instagram: { type: String, default: null },
    twitter: { type: String, default: null },
  },
  locked: { type: Boolean, default: false },
  following: [{ type: mongoose.Schema.ObjectId, ref: "Member" }],
  followers: [{ type: mongoose.Schema.ObjectId, ref: "Member" }],
})

const Member = mongoose.model("Member", userSchema)

module.exports = Member
