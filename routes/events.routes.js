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

module.exports = eventRouter
