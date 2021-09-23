require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("");
const app = express();
const setupRoutes = require("./routes/routes.js");
const port = process.env.PORT || 3000;

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
// NR.2
passport.serializeUser((user, cb) => {
  cb(null, user._id);
});
// NR.3
passport.deserializeUser((id, cb) => {
  User.findById(id)
    .then((user) => {
      cb(null, user);
    })
    .catch((err) => {
      cb(err);
    });
});

// NR.4
app.use(flash());

require("./middleware/passport");

app.use(passport.initialize());
app.use(passport.session());

setupRoutes(app);

app.listen(port, () => {
  console.log(`Server started ${port}`);
});
