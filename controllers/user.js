const { validationResult } = require('express-validator')
const User = require('../models/User')
const { generateHashedPassword, calculateToken } = require('../helpers/user')
const { generateServerErrorCode } = require('../helpers/utils')
const { USER_EXISTS_ALREADY, SOME_THING_WENT_WRONG } = require('../helpers/constants')

const findAll = (req, res) => {
    User.find({} ,(err, result) => {
        res.status(200).json({
          data: result,
        })
      })
  }

const addUser = async (req, res) => {
    const errorsAfterValidation = validationResult(req);
    if (!errorsAfterValidation.isEmpty()) {
      res.status(400).json({
        code: 400,
        errors: errorsAfterValidation.mapped(),
      });
    } else {
      try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            const data = await {
                email,
                hashedPassword: generateHashedPassword(password),
              };
          const newUser = await User.create(data)
          const token = calculateToken(email)
          const userToReturn = { ...newUser.toJSON(), ...{ token } };
          delete userToReturn.hashedPassword;
          res.status(200).json(userToReturn);
        } else {
          generateServerErrorCode(
            res,
            403,
            'register email error',
            USER_EXISTS_ALREADY,
            'email'
          );
        }
      } catch (e) {
        generateServerErrorCode(res, 500, e, SOME_THING_WENT_WRONG);
      }
    }
  }


module.exports = {
    findAll,
    addUser,
}