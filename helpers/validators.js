const { check } = require("express-validator")

const registerValidation = [
  check("firstName").exists().withMessage("First name missing"),
  check("lastName").exists().withMessage("Last name missing"),
  check("email")
    .exists()
    .withMessage("Email missing")
    .isEmail()
    .withMessage("Invalid email"),
  check("role").exists().withMessage("Role missing"),
]

const registerCommunityValidation = [
  check("firstName").exists().withMessage("First name missing"),
  check("lastName").exists().withMessage("Last name missing"),
  check("email")
    .exists()
    .withMessage("Email missing")
    .isEmail()
    .withMessage("Invalid email"),
  check("role").exists().withMessage("Role missing"),
]

module.exports = {
  registerValidation,
  registerCommunityValidation,
}
