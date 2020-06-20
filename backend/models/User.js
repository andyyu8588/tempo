const mongoose = require('mongoose')
const User = mongoose.Schema({
    email: String,
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    birthdate: Date,
    gender: String,
    history:[{
        dates : Date,// must not include hours or minutes
        workouts : [{
            time : [Date],//must include hours and minutes
            exercises : [String]
        }], default : []
    }],
    blacklist:[String], default : []
})

module.exports = mongoose.model('User', User)