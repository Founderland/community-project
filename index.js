const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const { setupRoutes } = require("./routes/routes.js");

const path = require("path");
app.use(express.static(path.join(__dirname, "build")));

const port = process.env.PORT || 3000;

app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1gd27.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to MONGO ATLAS"))
  .catch((err) => console.log(err));

setupRoutes(app);

app.use((req, res) =>
  res.sendFile(path.join(__dirname, "build", "index.html"))
);

app.listen(port, () => {
  console.log(`Server started ${port}`);
});
