require("dotenv").config()
const express = require("express")
const createHttpError = require("http-errors")
const mongoose = require("mongoose")
const flash = require("connect-flash")
const session = require("express-session")
const setupRoutes = require("./routes/routes.js")
const passportMiddleware = require("./middleware/passport")
const errorHandler = require("./middleware/error")
const path = require("path")
const port = process.env.PORT || 3001
const app = express()

app.use(express.json({ limit: "25mb" }))
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(express.static(path.join(__dirname, "/client/build/")))

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1gd27.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true`
  )
  .then(() => console.log("Connected to MONGO ATLAS"))
  .catch((err) => console.log(err))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
)

passportMiddleware(app)
setupRoutes(app)
app.use((req, res) =>
  res.sendFile(path.join(__dirname, "/client/build/", "index.html"))
)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server started ${port}`)
})
