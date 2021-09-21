const mongoose = require('mongoose')

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
        password: {
            type: String
        },
        mainColor: {
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

const User = mongoose.model('User',userSchema)

module.exports = User