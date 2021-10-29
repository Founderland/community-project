const profilePicRouter = require("express").Router()
const passport = require("passport")
const { uploadFile } = require("../helpers/cloudinary")

profilePicRouter.post(
  "/upload",
  passport.authenticate("jwt", { session: false }),
  uploadFile
)

module.exports = profilePicRouter
