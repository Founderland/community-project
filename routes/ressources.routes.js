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

//ADD Ressource
ressourceRouter.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  ressourceController.addRessource
)
ressourceRouter.post(
  "/addcategory",
  passport.authenticate("jwt", { session: false }),
  ressourceController.addCategory
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
