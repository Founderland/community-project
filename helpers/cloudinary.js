require("dotenv").config()
const cloudinary = require("cloudinary").v2

const uploadFile = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
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
}

module.exports = { uploadFile }
