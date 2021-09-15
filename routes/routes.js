const foundersRouter = require('./foundersApplicants.routes')

const setupRoutes = (app) => {
    app.use("/api/form/founders", foundersRouter)
}

module.exports = {
    setupRoutes,
}