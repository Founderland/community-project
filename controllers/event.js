const Event = require("../models/Event")

const findAll = async (req, res, next) => {
  const events = await Event.find({})
    .populate({
      path: "member",
      model: "Member",
      select: ["firstName", "lastName", "role", "photo"],
    })
    .populate({
      path: "interested",
      model: "Member",
      select: ["firstName", "lastName", "role", "photo"],
    })
    .populate({
      path: "going",
      model: "Member",
      select: ["firstName", "lastName", "role", "photo"],
    })
  if (events)
    res.status(200).json({
      data: events,
    })
}

const findFuture = async (req, res, next) => {
  const events = await Event.find({
    dateStart: { $gte: new Date() },
  })
    .populate({
      path: "member",
      model: "Member",
      select: ["firstName", "lastName", "role", "photo"],
    })
    .populate({
      path: "interested",
      model: "Member",
      select: ["firstName", "lastName", "role", "photo"],
    })
    .populate({
      path: "going",
      model: "Member",
      select: ["firstName", "lastName", "role", "photo"],
    })
  if (events)
    res.status(200).json({
      data: events,
    })
}

const findPast = async (req, res, next) => {
  const events = await Event.find({
    dateStart: { $lte: new Date() },
  })
    .populate({
      path: "member",
      model: "Member",
      select: ["firstName", "lastName", "role", "photo"],
    })
    .populate({
      path: "interested",
      model: "Member",
      select: ["firstName", "lastName", "role", "photo"],
    })
    .populate({
      path: "going",
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
    .populate({
      path: "member",
      model: "Member",
      select: ["firstName", "lastName", "role", "photo"],
    })
    .populate({
      path: "interested",
      model: "Member",
      select: ["firstName", "lastName", "role", "photo"],
    })
    .populate({
      path: "going",
      model: "Member",
      select: ["firstName", "lastName", "role", "photo"],
    })
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
  const {
    _id,
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
    const updatedEvent = await Event.findOneAndUpdate({ _id }, event, {
      new: true,
    })
    if (!updatedEvent) {
      await Promise.reject("Error saving event")
    }
    return res.status(200).json({ success: true, resource: updatedEvent })
  } catch (e) {
    console.log(e)
    return res.status(404).json({ e })
  }
}
const cancelEvent = async (req, res, next) => {
  const { id } = req.params
  try {
    const canceled = await Event.findOneAndUpdate(
      { _id: id },
      { isCanceled: true },
      {
        new: true,
      }
    )
    if (canceled) {
      res.status(200).json({
        data: canceled,
      })
    } else {
      res.status(404).json({
        message: "Event not found",
      })
    }
  } catch (e) {
    res.status(500).json({ message: e })
  }
}
const deleteEvent = async (req, res, next) => {
  const { id } = req.params
  try {
    const deleted = await Event.findByIdAndDelete(id)
    if (!deleted) await Promise.reject("NOT_FOUND")
    res
      .status(200)
      .json({ success: true, message: "Question deleted successfully" })
  } catch (e) {
    if (e === "NOT_FOUND") {
      res
        .status(404)
        .json({ error: true, message: "Question no longer in the database" })
    } else {
      res
        .status(500)
        .json({ error: true, message: "Sorry something went wrong" })
    }
  }
}
const updateAttendance = async (req, res, next) => {
  const { id, member, interested, going } = req.body
  try {
    let updateGoing
    let updateInterested
    let updateBoth
    if (going) {
      updateGoing = await Event.findByIdAndUpdate(id, {
        $push: { going: member },
      })
      updateInterested = await Event.findByIdAndUpdate(
        id,
        {
          $pull: { interested: member },
        },
        { new: true }
      )
      if (!updateGoing || !updateInterested)
        await Promise.reject("UPDATE_FAILED")
    } else if (interested) {
      updateGoing = await Event.findByIdAndUpdate(
        id,
        {
          $pull: { going: member },
        },
        { new: true }
      )
      updateInterested = await Event.findByIdAndUpdate(id, {
        $push: { interested: member },
      })
      if (!updateGoing || !updateInterested)
        await Promise.reject("UPDATE_FAILED")
    } else {
      updateBoth = await Event.findByIdAndUpdate(
        id,
        {
          $pull: { going: member, interested: member },
        },
        { new: true }
      )
      if (!updateBoth) await Promise.reject("UPDATE_FAILED")
    }
    res.status(200).json({ message: "attendance has been updated" })
  } catch (e) {
    if (e === "UPDATE_FAILED") {
      res.status(400).send({
        message: "we couldn't add you to the event",
      })
    } else {
      res.status(500).json({ message: "Sorry something went wrong" })
    }
  }
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
