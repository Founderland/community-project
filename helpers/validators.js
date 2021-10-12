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
  check("password")
    .exists()
    .withMessage("Password missing")
    .isLength({ min: 8 })
    .withMessage("Password too short"),
]

module.exports = {
  registerValidation,
}
