const profilePicRouter = require("express").Router()
const { cloudinary } = require("../helpers/cloudinary")

profilePicRouter.post("/upload", async (req, res) => {
  try {
    const { data, public_id, folder } = req.body
    const uploadedResponse = await cloudinary.uploader.upload(data, {
      folder: folder,
      public_id: public_id,
    })
    res.json({
      message: "Picture uploaded succesfully",
      public_id: uploadedResponse.public_id,
      url: uploadedResponse.secure_url,
      format: uploadedResponse.format,
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "Something went wrong" })
  }
})

module.exports = profilePicRouter
