const responseRouter = require("./responses.routes")
const formRouter = require("./form.routes")
const userRouter = require("./users.routes")
const authRouter = require("./auth.routes")

const setupRoutes = (app) => {
  //FOUNDERS
  app.use("/api/founder", responseRouter)
  //USERS
  app.use("/api/users", userRouter)
  // FOUNDER-FORM
  app.use("/api/form", formRouter)
  //Auth
  app.use("/api/auth", authRouter)
}

module.exports = setupRoutes
