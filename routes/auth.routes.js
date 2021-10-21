const authRouter = require("express").Router()
const authController = require("../controllers/auth")
const passport = require("passport")
const memberController = require("../controllers/member")

// // Route to check if the user is logged in
// authRouter.get("/verify", isUser, (req, res) => {
//   req.user.hashedPassword = null
//   res.send(req.user)
// })

// // Sending errors to client
// authRouter.get("/errors", (req, res) => {
//   res.send({ message: req.flash("error") })
// })

// // POST to Log-in
// authRouter.post(
//   "/log-in",
//   passport.authenticate("local", {
//     successRedirect: "/api/auth/verify",
//     failureRedirect: "/api/auth/errors",
//     failureFlash: true,
//     passReqToCallback: true,
//   })
// )

// authRouter.get("/verifyAdmin", isAdmin, (req, res) => {
//   res.send(req.user)
// })

//AUTHENTICATE
authRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  authController.authorizeUser
)

authRouter.post(
  "/signup",
  passport.authenticate("jwt", { session: false }),
  memberController.confirmUser,
  authController.authorizeUser
)

module.exports = authRouter
