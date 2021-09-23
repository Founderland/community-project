const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    email_is_verified: {
      type: Boolean,
      default: false,
    },
    hashedpassword: {
      type: String,
    },
    role: {
      type: String,
      enum: ["sadmin", "admin", "user"],
      required: true,
      default: "user",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { strict: false }
);

// userSchema.methods.isValidPassword = async (password) => {
//     const user = this
//     const compare = await bcrypt.compare(password, user.password)
//     return compare
// }

const User = mongoose.model("User", userSchema);

module.exports = User;
