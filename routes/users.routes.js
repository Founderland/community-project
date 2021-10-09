const UserRouter = require("express").Router()
const userController = require("../controllers/user")
const passport = require("passport")
const { isAdmin, isUser } = require("./auth.routes")

const { registerValidation } = require("../helpers/validators")

UserRouter.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  userController.findAll
)

UserRouter.post("/add", registerValidation, userController.addUser)

module.exports = UserRouter
