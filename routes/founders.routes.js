const router = require("express").Router();
const foundersController = require("../controller/founders");
const foundersFormController = require("../controller/foundersform");

//GET ALL FORM RESPONSE
router.get("/", foundersController.findAllFoundersApplicants);

//ADD A NEW FORM RESPONSE
router.post("/", foundersController.addFoundersApplicant);

//ADD QUESTIONS TO FORM
router.post("/add", foundersFormController.addNew);
//ADD QUESTIONS TO FORM
router.get("/questions", foundersFormController.findAll);

module.exports = router;
