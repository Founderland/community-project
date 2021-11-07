const responseRouter = require("express").Router()
const responseController = require("../controllers/response")
const newsletterController = require("../controllers/NewsletterResponse")
const memberController = require("../controllers/member")
const {
  sendConnectEmail,
  sendRejected,
  sendThankYou,
} = require("../helpers/emailHandler")
const { registerCommunityValidation } = require("../helpers/validators")
const passport = require("passport")

// ADD NEWSLETTER RESPONSE

responseRouter.post(
  "/response/newsletter",
  newsletterController.addNewsletterResponse,
  sendThankYou,
  async (req, res) => {
    res.status(200).json({ success: 1, data: req.newResponse })
  }
)

// GET NEWSLETTER RESPONSE
responseRouter.get(
  "/response/newsletter",
  passport.authenticate("jwt", { session: false }),
  newsletterController.findNewsletterResponse
)

//ADD APPLICANTS RESPONSE
responseRouter.post(
  "/response",
  responseController.addResponse,
  sendThankYou,
  async (req, res) => {
    res.status(200).json({ success: 1, data: req.newResponse })
  }
)
//GET APPLICANTS RESPONSE
responseRouter.get(
  "/response",
  passport.authenticate("jwt", { session: false }),
  responseController.findAllResponse
)

// GET ALL COMMENTS
responseRouter.get(
  "/response/comments/:id",
  passport.authenticate("jwt", { session: false }),
  responseController.getComments
)

//ADD/EDIT COMMENTS TO AN APPLICATION
responseRouter.put(
  "/response/newcomment",
  passport.authenticate("jwt", { session: false }),
  responseController.addComment
)

// DELETE COMMENT
responseRouter.delete(
  "/response/:id/:commentId",
  passport.authenticate("jwt", { session: false }),
  responseController.deleteComment
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

//APPROVE/REJECT/REVIEW APPLICANT BY ID
responseRouter.put(
  "/response/approve/",
  passport.authenticate("jwt", { session: false }),
  registerCommunityValidation,
  memberController.addMember,
  responseController.updateStatus,
  sendConnectEmail,
  memberController.updateNotified
)
responseRouter.put(
  "/response/reject/",
  passport.authenticate("jwt", { session: false }),
  responseController.updateStatus,
  sendRejected,
  responseController.updateNotified
)
responseRouter.put(
  "/response/review",
  passport.authenticate("jwt", { session: false }),
  responseController.updateStatus
)

module.exports = responseRouter
