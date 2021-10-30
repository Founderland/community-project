const UserRouter = require("express").Router()
const userController = require("../controllers/user")
const memberController = require("../controllers/member")
const { sendConnectEmail, sendVerifyEmail } = require("../helpers/emailHandler")
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
UserRouter.get(
  "/profile/:id",
  passport.authenticate("jwt", { session: false }),
  userController.findOne
)
UserRouter.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  registerValidation,
  userController.addUser,
  sendVerifyEmail,
  (req, res) => {
    res.status(200).json({ message: "user notified" })
  }
)
UserRouter.post(
  "/notify",
  passport.authenticate("jwt", { session: false }),
  userController.findOne,
  sendVerifyEmail,
  (req, res) => {
    res.status(200).json({ message: "user notified" })
  }
)
UserRouter.put(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  userController.updateProfile
)
UserRouter.put(
  "/lock",
  passport.authenticate("jwt", { session: false }),
  userController.lockProfile
)
//ADMIN-COMMUNITY
UserRouter.get(
  "/community/members/:role",
  passport.authenticate("jwt", { session: false }),
  memberController.findAll
)
UserRouter.post(
  "/community/add",
  passport.authenticate("jwt", { session: false }),
  registerCommunityValidation,
  memberController.addMember,
  sendConnectEmail,
  memberController.updateNotified
)
UserRouter.post(
  "/community/notify/:id",
  passport.authenticate("jwt", { session: false }),
  memberController.findMember,
  sendConnectEmail,
  memberController.updateNotified
)
UserRouter.put(
  "/community/lock",
  passport.authenticate("jwt", { session: false }),
  memberController.lockProfile
)

//COMMUNITY
UserRouter.get(
  "/community/profile/:id",
  passport.authenticate("jwt", { session: false }),
  memberController.findMember
)

module.exports = UserRouter
