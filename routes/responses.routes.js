const responseRouter = require("express").Router()
const responseController = require("../controllers/response")
const memberController = require("../controllers/member")
const { sendConnectEmail } = require("../helpers/emailHandler")
const {
  registerValidation,
  registerCommunityValidation,
} = require("../helpers/validators")
const passport = require("passport")

//ADD APPLICANTS RESPONSE
responseRouter.post(
  "/response",
  passport.authenticate("jwt", { session: false }),
  responseController.addResponse
)
//GET APPLICANTS RESPONSE
responseRouter.get(
  "/response",
  passport.authenticate("jwt", { session: false }),
  responseController.findAllResponse
)
//EDIT  APPLICANTS RESPONSE
responseRouter.put(
  "/response/:id/:score",
  passport.authenticate("jwt", { session: false }),
  responseController.editResponse
)

//GET APPLICANTS RESPONSE BY ID / STATUS ["New", "Pending", "Approved", "Rejected"] / ROLE
responseRouter.get(
  "/response/:id",
  passport.authenticate("jwt", { session: false }),
  responseController.findResponseById
)
responseRouter.get(
  "/response/:status/:role",
  passport.authenticate("jwt", { session: false }),
  responseController.findResponsesByStatus
)

//APPROVE APPLICANT BY ID
responseRouter.put(
  "/response/approve/",
  passport.authenticate("jwt", { session: false }),
  registerCommunityValidation,
  memberController.addMember,
  sendConnectEmail,
  memberController.updateNotified
)

module.exports = responseRouter
