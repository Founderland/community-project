const NewsLetterResponse = require("../models/NewsLetterResponse")

// Add Founders Response

const addNewsletterResponse = async (req, res) => {
  const { firstName, lastName, email, interests } = req.body
  try {
    const subscribed = await NewsLetterResponse.findOne({ email })
    if (subscribed) await Promise.reject(new Error("Already Registered"))
    const newResponse = await NewsLetterResponse.create({
      firstName,
      lastName,
      email,
      interests,
      subscriptionDate: new Date(),
    })
    if (!newResponse) {
      await Promise.reject("newsletter response error") //reject promise with error
    }
    return res.status(200).json("Succesful attempt")
  } catch (e) {
    return res.status(404).json({ error: e.message })
  }
}

const findNewsletterResponse = async (req, res) => {
  try {
    const result = await NewsLetterResponse.find({})
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  addNewsletterResponse,
  findNewsletterResponse,
}
