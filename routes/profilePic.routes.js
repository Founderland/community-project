const profilePicRouter = require("express").Router()
const { cloudinary } = require("../helpers/cloudinary")

profilePicRouter.post("/upload", async (req, res) => {
  try {
    const fileStr = req.body.data
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "profile_pictures",
    })
    console.log(uploadedResponse.public_id)
    res.json({ message: "Picture uploaded succesfully" })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "Something went wrong" })
  }
})

module.exports = profilePicRouter
