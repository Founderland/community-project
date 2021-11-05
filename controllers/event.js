const Event = require("../models/Event")

const findAll = async (req, res, next) => {
  const events = await Event.find({})
  if (events)
    res.status(200).json({
      data: events,
    })
}

const findFuture = async (req, res, next) => {
  const events = await Event.find({
    dateStart: { $gte: new Date() },
  })
  if (events)
    res.status(200).json({
      data: events,
    })
}

const findPast = async (req, res, next) => {
  const events = await Event.find({
    dateStart: { $lte: new Date() },
  }).populate({
    path: "member",
    model: "Member",
    select: ["firstName", "lastName", "role", "photo"],
  })
  if (events)
    res.status(200).json({
      data: events,
    })
}

const findOne = async (req, res, next) => {
  let { id } = req.params
  if (!id) {
    id = req.body.id
  }
  const event = await Event.findOne({ _id: id })
  console.log(event)
  if (event) {
    if (req.body.task) {
      return next()
    } else {
      res.status(200).json({
        data: event,
      })
    }
  } else {
    res.status(404).json({
      message: "Event not found",
    })
  }
}

const addEvent = async (req, res, next) => {
  const {
    member,
    anounce,
    description,
    eventCover,
    type,
    tags,
    address,
    city,
    dateEnd,
    dateStart,
    geoLocation,
    link,
    location,
    title,
    zoom,
  } = req.body
  try {
    const event = {
      member,
      anounce,
      description,
      eventCover,
      type,
      tags,
      address,
      city,
      dateEnd: new Date(dateEnd),
      dateStart: new Date(dateStart),
      geoLocation,
      link,
      location,
      title,
      zoom,
    }
    const newEvent = await Event.create(event)
    if (!newEvent) {
      await Promise.reject("Error saving event")
    }
    return res.status(200).json({ success: true, resource: newEvent })
  } catch (e) {
    console.log(e)
    return res.status(404).json({ e })
  }
}

const updateEvent = async (req, res, next) => {
  console.log("updateEvent")
}
const cancelEvent = async (req, res, next) => {
  console.log("updateEvent")
}
const deleteEvent = async (req, res, next) => {
  console.log("Update Attendance for User")
}
const updateAttendance = async (req, res, next) => {
  console.log("Update Attendance for User")
}

module.exports = {
  findAll,
  findFuture,
  findPast,
  findOne,
  addEvent,
  updateEvent,
  cancelEvent,
  deleteEvent,
  updateAttendance,
}
