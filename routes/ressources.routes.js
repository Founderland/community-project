const ressourceRouter = require("express").Router()
const ressourceController = require("../controllers/ressource")
const passport = require("passport")

//GET Ressource
ressourceRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  ressourceController.findAllRessource
)
ressourceRouter.get(
  "/:category",
  passport.authenticate("jwt", { session: false }),
  ressourceController.findRessourcesByCategory
)

//EDIT Ressource
ressourceRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  ressourceController.editRessource
)

// DELETE Ressource
ressourceRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  ressourceController.deleteRessource
)

module.exports = ressourceRouter
