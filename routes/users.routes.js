const UserRouter = require("express").Router()
const userController = require("../controllers/user")
const communityUserController = require("../controllers/communityUser")
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
  communityUserController.addUser
)
UserRouter.get(
  "/community/:role",
  passport.authenticate("jwt", { session: false }),
  communityUserController.findAll
)

//COMMUNITY

module.exports = UserRouter
