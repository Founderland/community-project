const responseRouter = require("./responses.routes")
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

  app.use("/api/profile-picture", profilePicRouter)
}

module.exports = setupRoutes
