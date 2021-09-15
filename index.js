const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const { setupRoutes } = require('./routes/routes.js')

const port = process.env.PORT || 3000

app.use(express.json())

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1gd27.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
.then((result)=>console.log('Connected to MONGO ATLAS'))
   .catch((err) => console.log(err))

 
setupRoutes(app)

app.listen(port, () => {
    console.log('Server started')
})