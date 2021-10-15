const UserRouter = require("express").Router()
const userController = require("../controllers/user")
const memberController = require("../controllers/member")
const passport = require("passport")

const {
  registerValidation,
  registerCommunityValidation,
} = require("../helpers/validators")

//ADMIN
UserRouter.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  userController.findAll
)
UserRouter.post("/add", registerValidation, userController.addUser)
UserRouter.post(
  "/community/add",
  registerCommunityValidation,
  memberController.addUser
)
UserRouter.get(
  "/community/:role",
  passport.authenticate("jwt", { session: false }),
  memberController.findAll
)

//COMMUNITY

module.exports = UserRouter
