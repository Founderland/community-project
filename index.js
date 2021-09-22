require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const setupRoutes = require('./routes/routes.js')
const port = process.env.PORT || 3000;
require('./helpers/passport')

app.use(express.json())

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
