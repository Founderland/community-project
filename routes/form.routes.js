const formRouter = require("express").Router();
const foundersFormController = require("../controllers/foundersform");

//ADD QUESTIONS TO FORM
formRouter.post("/add", foundersFormController.addNew);
//ADD QUESTIONS TO FORM
formRouter.get("/questions", foundersFormController.findAll);

module.exports = formRouter;
