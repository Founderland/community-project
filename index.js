require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const app = express();
const setupRoutes = require("./routes/routes.js");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { authenticateUser } = require("./controllers/auth");
const User = require("./models/User");
const port = process.env.PORT || 3000;
const passportMiddleware = require("./middleware/passport");

app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1gd27.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to MONGO ATLAS"))
  .catch((err) => console.log(err));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());

passportMiddleware();

app.use(passport.initialize());
app.use(passport.session());

setupRoutes(app);

app.listen(port, () => {
  console.log(`Server started ${port}`);
});
