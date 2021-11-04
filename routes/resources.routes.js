const resourceRouter = require("express").Router()
const resourceController = require("../controllers/resource")
const passport = require("passport")

//GET Resource
resourceRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  resourceController.findAllResource
)
resourceRouter.get(
  "/category/:category",
  passport.authenticate("jwt", { session: false }),
  resourceController.findResourcesByCategory
)
resourceRouter.get(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  resourceController.findResourceById
)

//ADD Resource
resourceRouter.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  resourceController.addResource
)
resourceRouter.post(
  "/addcategory",
  passport.authenticate("jwt", { session: false }),
  resourceController.addCategory
)

//EDIT Resource
resourceRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  resourceController.editResource
)

// DELETE Resource
resourceRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  resourceController.deleteResource
)

module.exports = resourceRouter
