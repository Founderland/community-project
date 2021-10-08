const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	hashedPassword: {
		type: String,
		required: true
	},
	role: {
		type: String,
		enum: ['sadmin', 'admin', 'user'],
		required: true,
		default: 'user'
	},
	avatar: {
		type: String,
		default: 'bg-gradient-to-t from-red-300 to-red-500 bg-cover'
	},
	dateCreated: {
		type: Date,
		default: Date.now
	}
})

const User = mongoose.model('User', userSchema)

module.exports = User
