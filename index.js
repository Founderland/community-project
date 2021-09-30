require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const app = express()
const setupRoutes = require('./routes/routes.js')
const passport = require('passport')
const port = process.env.PORT || 3000
const passportMiddleware = require('./middleware/passport')

const path = require('path')
app.use(express.static(path.join(__dirname, 'build')))

// CORS Error
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1gd27.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => console.log('Connected to MONGO ATLAS'))
  .catch((err) => console.log(err))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
)

app.use(flash())

passportMiddleware()

app.use(passport.initialize())
app.use(passport.session())

setupRoutes(app)

app.use((req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')))

app.listen(port, () => {
  console.log(`Server started ${port}`)
})
