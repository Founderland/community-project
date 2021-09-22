require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const {applyPassportStrategy} = require('./helpers/passport')
const app = express()
const setupRoutes = require('./routes/routes.js')
 

const port = process.env.PORT || 3000;

app.use(express.json())
applyPassportStrategy(passport)

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1gd27.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to MONGO ATLAS"))
  .catch((err) => console.log(err));

setupRoutes(app);

app.listen(port, () => {
  console.log(`Server started ${port}`);
});
