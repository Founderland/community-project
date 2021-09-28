const founderRouter = require("./founder.routes");
const investorRouter = require("./investor.routes");
const userRouter = require("./users.routes");
const formRouter = require("./form.routes");
const { authRouter, isUser, isAdmin } = require("./auth.routes");

const setupRoutes = (app) => {
  //FOUNDERS
  app.use("/api/founder", founderRouter);
  //INVESTORS
  app.use("/api/investor", investorRouter);
  //USERS
  app.use("/api/users", isUser, userRouter);
  // FOUNDER-FORM
  app.use("/api/form", formRouter);
  //Auth
  app.use("/api/auth", authRouter);
};

module.exports = setupRoutes;
