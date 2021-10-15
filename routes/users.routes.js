const UserRouter = require("express").Router()
const userController = require("../controllers/user")
const memberController = require("../controllers/member")
const { sendConnectEmail } = require("../helpers/emailHandler")
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
UserRouter.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  registerValidation,
  userController.addUser
)
//ADMIN-COMMUNITY
UserRouter.post(
  "/community/add",
  passport.authenticate("jwt", { session: false }),
  registerCommunityValidation,
  memberController.addMember,
  sendConnectEmail,
  memberController.updateNotified
)
UserRouter.get(
  "/community/:role",
  passport.authenticate("jwt", { session: false }),
  memberController.findAll
)

//COMMUNITY PROFILES

module.exports = UserRouter
