const eventRouter = require("express").Router()
const eventController = require("../controllers/event")
const passport = require("passport")

//ADMIN COMMUNITY
eventRouter.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  eventController.findAll
)
eventRouter.get(
  "/future",
  passport.authenticate("jwt", { session: false }),
  eventController.findFuture
)
eventRouter.get(
  "/past",
  passport.authenticate("jwt", { session: false }),
  eventController.findPast
)
eventRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  eventController.findOne
)
//ADD
eventRouter.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  eventController.addEvent
)
//UPDATE
eventRouter.put(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  eventController.updateEvent
)
eventRouter.put(
  "/attendance",
  passport.authenticate("jwt", { session: false }),
  eventController.updateAttendance
)
//Cancel event
eventRouter.put(
  "/cancel/:id",
  passport.authenticate("jwt", { session: false }),
  eventController.cancelEvent
)
//DELETE
eventRouter.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  eventController.deleteEvent
)

module.exports = eventRouter
