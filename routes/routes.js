const responseRouter = require("./responses.routes")
const resourceRouter = require("./resources.routes")
const formRouter = require("./form.routes")
const userRouter = require("./users.routes")
const authRouter = require("./auth.routes")
const eventRouter = require("./events.routes")
const profilePicRouter = require("./profilePic.routes")

const setupRoutes = (app) => {
  //FOUNDERS
  app.use("/api/applicants", responseRouter)
  //USERS
  app.use("/api/users", userRouter)
  // FOUNDER-FORM
  app.use("/api/form", formRouter)
  //Auth
  app.use("/api/auth", authRouter)
  //Events
  app.use("/api/events", eventRouter)
  //Resources
  app.use("/api/resources", resourceRouter)

  app.use("/api/profile-picture", profilePicRouter)
}

module.exports = setupRoutes
