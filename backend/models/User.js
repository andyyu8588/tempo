const mongoose = require('mongoose')

const User = mongoose.Schema({
    username : String,
    password : String,
    difficulty : {type : String, default : 'Intermediate'},
    equipment : {type : [String], default : ['Bodyweight']},
    bodyPart : {type : [String], default : ['Abs','Back','Biceps','Chest','Forearm', 'Glutes', 'Shoulders', 'Triceps', 'Upper Legs', 'Lower Legs', 'Cardio']},
    workoutDuration : {type : Number, default : 5},
    history:[{
        dates : Date,// must not include hours or minutes
        workouts : {type : [{
            time : [Date],//must include hours and minutes
            exercises : [String]
        }], 
        default : []}
    }],
    blacklist:{default : [String], default : []}
})

module.exports = mongoose.model('User', User)