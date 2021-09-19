const foundersRouter = require('./founders.routes')
const investorsRouter = require('./investors.routes')

const setupRoutes = (app) => {
    //FOUNDERS
    app.use("/api/form/founders", foundersRouter)
    //INVESTORS
    app.use("/api/form/investors", investorsRouter)

}

module.exports = {
    setupRoutes,
}