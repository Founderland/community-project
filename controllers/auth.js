const User = require("../models/User");
require("dotenv").config();
const bcrypt = require("bcrypt");

const authenticateUser = async (req, email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: "User not found" });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false, { message: "Wrong Password" });
    }
    return done(null, user, { message: "Logged in Successfully" });
  } catch (error) {
    return done(error);
  }
};

module.exports = { authenticateUser };
