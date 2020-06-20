const mongoose = require('mongoose')
const User = mongoose.Schema({
    username: String,
    password: String,
    difficulty : String, default : 'Intermediate',
    equipment : [String], default : ['Bodyweight'],
    bodyPart : [String], default : ['All'],
    workoutDuration : Number, default : 5,
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