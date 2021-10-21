const responseRouter = require("express").Router()
const Response = require("../controllers/response")
const { sendConnectEmail } = require("../helpers/emailHandler")

const passport = require("passport")

//ADD APPLICANTS RESPONSE
responseRouter.post(
  "/response",
  passport.authenticate("jwt", { session: false }),
  Response.addResponse
)
//GET APPLICANTS RESPONSE
responseRouter.get(
  "/response",
  passport.authenticate("jwt", { session: false }),
  Response.findAllResponse
)
//EDIT  APPLICANTS RESPONSE
responseRouter.put(
  "/response/:id/:score",
  passport.authenticate("jwt", { session: false }),
  Response.editResponse
)

//GET APPLICANTS RESPONSE BY ID / STATUS ["New", "Pending", "Approved", "Rejected"] / ROLE
responseRouter.get(
  "/response/:id",
  passport.authenticate("jwt", { session: false }),
  Response.findResponseById
)
responseRouter.get(
  "/response/:status/:role",
  passport.authenticate("jwt", { session: false }),
  Response.findResponsesByStatus
)

//APPROVE APPLICANT BY ID
responseRouter.put(
  "/response/approve/:id",
  passport.authenticate("jwt", { session: false }),
  Response.approveResponse
)

module.exports = responseRouter
