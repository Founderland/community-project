const responseRouter = require("express").Router()
const Response = require("../controllers/response")

//ADD APPLICANTS RESPONSE
responseRouter.post("/response", Response.addResponse)
//GET APPLICANTS RESPONSE
responseRouter.get("/response", Response.findAllResponse)
//EDIT  APPLICANTS RESPONSE
responseRouter.put("/response/:id/:score", Response.editResponse)

//GET APPLICANTS RESPONSE BY STATUS ["New", "Pending", "Approved", "Rejected"]
responseRouter.get("/response/:status/:role", Response.findResponsesByStatus)

responseRouter.put("/response/:status/:id", Response.updateStatus)

module.exports = responseRouter
