const Event = require("../models/Event")

const findAll = async (req, res, next) => {
  const events = await Event.find({})
  if (events)
    res.status(200).json({
      data: events,
    })
}

const findFuture = async (req, res, next) => {
  const events = await Event.find({ dateStart: { $gte: Date.now() } })
  if (events)
    res.status(200).json({
      data: events,
    })
}

const findPast = async (req, res, next) => {
  const events = await Event.find({ dateEnd: { $lt: Date.now() } })
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

const updateOne = async (req, res, next) => {
  console.log("updateEvent")
}

const updateAttendance = async (req, res, next) => {
  console.log("Update Attendance for User")
}

module.exports = {
  findAll,
  findFuture,
  findPast,
  findOne,
  updateOne,
  updateAttendance,
}
