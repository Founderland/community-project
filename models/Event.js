const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  photo: {
    public_id: { type: String },
    url: { type: String },
  },
  description: {
    type: String,
    required: true,
  },
  dateStart: {
    type: Date,
    required: true,
  },
  dateEnd: {
    type: Date,
    required: true,
  },
  interested: [{ type: mongoose.Schema.ObjectId, ref: "Member" }],
  going: [{ type: mongoose.Schema.ObjectId, ref: "Member" }],
  location: { type: String },
  address: { type: String },
  city: {
    type: String,
    trim: true,
  },
  geoLocation: { lat: { type: Number }, lon: { type: Number } },
  type: {
    type: String,
    enum: ["online", "public", "private"],
    default: "online",
  },
  link: { type: String },
  tags: [{ type: String }],
  announce: { type: Boolean, default: false },
})

const Event = mongoose.model("Event", eventSchema)

module.exports = Event
