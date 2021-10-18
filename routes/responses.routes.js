const founderRouter = require("express").Router()
const founderResponse = require('../controllers/founderResponse')

//ADD APPLICANTS RESPONSE
founderRouter.post("/response", founderResponse.addResponse)
//GET APPLICANTS RESPONSE
founderRouter.get("/response", founderResponse.findAllResponse)
//EDIT  APPLICANTS RESPONSE
founderRouter.put("/response/:id/:score", founderResponse.editResponse)

//GET APPLICANTS RESPONSE BY STATUS ["New", "Pending", "Approved", "Rejected"]
founderRouter.get("/response/:status", founderResponse.findResponsesByStatus)

founderRouter.put("/response/:status/:id", founderResponse.updateStatus)


module.exports = founderRouter