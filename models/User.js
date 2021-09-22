const mongoose = require('mongoose')
const sha256 = require('sha256')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        email_is_verified: {
            type: Boolean,
            default: false
        },
        hashedpassword: {
            type: String
        },
        role: {
            type: String, 
            enum: ['sadmin', 'admin', 'user'], 
            required: true, 
            default: 'user'
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    { strict: false }
)
/**
 * @param {*} password
 */
 userSchema.methods.comparePassword = function comparePassword(password) {
    return this.hashedPassword === sha256(password);
  };

const User = mongoose.model('User',userSchema)

module.exports = User