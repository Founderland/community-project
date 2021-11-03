const ressourceRouter = require("express").Router()
const ressourceController = require("../controllers/ressource")
const passport = require("passport")

//GET Ressource
ressourceRouter.get(
  "/ressource",
  passport.authenticate("jwt", { session: false }),
  ressourceController.findAllRessource
)

//EDIT Ressource
ressourceRouter.put(
  "/ressource/newcomment",
  passport.authenticate("jwt", { session: false }),
  ressourceController.editRessource
)

// DELETE Ressource
ressourceRouter.delete(
  "/ressource/:id/:commentId",
  passport.authenticate("jwt", { session: false }),
  ressourceController.deleteRessource
)

module.exports = ressourceRouter
