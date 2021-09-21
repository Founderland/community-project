const founderRouter = require('./founder.routes')
const investorRouter = require('./investor.routes')
const authRouter = require('./auth.routes')

const setupRoutes = (app) => {
    //FOUNDERS
    app.use("/api/founder", founderRouter)
    //INVESTORS
    app.use("/api/investor", investorRouter)
    //Auth
    app.use("/api/auth", authRouter)    
}

module.exports = setupRoutes