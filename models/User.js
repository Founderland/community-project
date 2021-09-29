const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
    hashedPassword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['sadmin', 'admin', 'user'],
      required: true,
      default: 'user',
    },
    avatar: {
      type: String,
      default:
        'https://www.businessnetworks.com/sites/default/files/default_images/default-avatar.png',
    },
    date: {
      type: Date,
      default: Date.now,
    },
  }
  // { strict: false }
)

// userSchema.methods.isValidPassword = async (password) => {
//     const user = this
//     const compare = await bcrypt.compare(password, user.password)
//     return compare
// }

const User = mongoose.model('User', userSchema)

module.exports = User
