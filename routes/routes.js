const founderRouter = require('./founder.routes')
const investorRouter = require('./investor.routes')
const formRouter = require('./form.routes')
const userRouter = require('./users.routes')
const authRouter = require('./auth.routes')

const setupRoutes = (app) => {
    //FOUNDERS
    app.use("/api/founder", founderRouter)
    //INVESTORS
    app.use("/api/investor", investorRouter)
    //FORM
    app.use("/api/form/", formRouter)
    //USERS
    app.use("/api/users", userRouter)
    //Auth
    app.use("/api/auth", authRouter)    
}

module.exports = setupRoutes