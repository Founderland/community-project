const Ressource = require("../models/Ressource")

// Add Ressource
const addRessource = async (req, res, next) => {
  const { firstName, lastName, totalScore, answerData } = req.body
  try {
    //  data.map(async (item) => {
    const newRessource = await Ressource.create({
      firstName,
      lastName,
      totalScore,
      answerData,
    })

    // {
    //   // question_id: `${item.question_id}`,
    //   // answerId: `${item.answer_id}`,
    //   // score : `${item.score}`
    // }

    if (!newRessource) {
      await Promise.reject("founder response error") //reject promise with error
    }
    // })

    return res.status(200).json("Succesful attempt")
  } catch (e) {
    if (e === "founder response error") {
      console.log("founder response error")
    } else {
      console.log(e)
      return res.status(404).json({ e })
    }
  }
}
// Find Ressource
const findAllRessource = async (req, res) => {
  try {
    const result = await Ressource.find({})
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
  }
}
const findRessourcesByCategory = async (req, res) => {
  const { category } = req.params
  try {
    const result = await Ressource.find({
      categoryKey: category,
    }).populate({
      path: "articles.member",
      model: "Member",
      select: ["firstName", "lastName", "role", "photo"],
    })
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
  }
}
const findRessourceById = async (req, res) => {
  const { id } = req.params
  try {
    const result = await Ressource.findOne({ _id: id }).sort({
      totalScore: "desc", //order responses by score
    })
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
  }
}
// Update Ressource
const editRessource = async (req, res) => {
  const { id } = req.params
  try {
    const updated = await Ressource.findByIdAndUpdate(id, {
      totalScore: score,
    })
    if (!updated) await Promise.reject("NOT_FOUND")
    res.json({ message: "Update successful" })
  } catch (e) {
    if (e === "NOT_FOUND") {
      res.status(404).send({
        message:
          "The question you're trying to update is no longer in the database",
      })
    } else {
      res.status(500).json({ message: "Sorry something went wrong" })
    }
  }
}
//Delete Ressource
const deleteRessource = async (req, res) => {
  const { id, commentId } = req.params
  try {
    const updatedList = await Ressource.findByIdAndUpdate(
      id,
      {
        $pull: { comments: { _id: commentId } },
      },
      { new: true }
    )

    if (!updatedList) await Promise.reject("NOT_FOUND")
    res.json({
      message: "Ressource has been deleted",
    })
  } catch (e) {
    console.log(e)

    if (e === "NOT_FOUND") {
      res.status(404).json({ message: "Sorry we couldn't find any comments" })
    } else {
      res.status(500).json({ message: "Something went wrong" })
    }
  }
}

module.exports = {
  addRessource,
  findAllRessource,
  findRessourceById,
  findRessourcesByCategory,
  editRessource,
  deleteRessource,
}
