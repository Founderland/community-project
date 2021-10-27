const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  banner: {
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
})

const Event = mongoose.model("Event", eventSchema)

module.exports = Event
