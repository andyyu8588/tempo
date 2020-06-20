const mongoose = require('mongoose')
const User = mongoose.Schema({
    email: String,
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    birthdate: Date,
    gender: String,
    blacklist:[String], default : []
})

module.exports = mongoose.model('User', User)