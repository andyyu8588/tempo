const mongoose = require('mongoose')

const User = mongoose.Schema({
    username : String,
    password : String,
    difficulty : {type : String, default : 'Intermediate'},
    equipment : {type : [String], default : ['Body Only']},
    bodyPart : {type : [String], default : ['Abs','Back','Biceps','Chest','Forearm', 'Glutes', 'Shoulders', 'Triceps', 'Upper Legs', 'Lower Legs', 'Cardio']},
    workoutDuration : {type : Number, default : 5},
    history:[{
        date : Date,// must not include hours or minutes
        workouts : [{time : Date, value : [String]}], 
        default : []
    }],
    blacklist:{type : [String], default : []}
})

module.exports = mongoose.model('User', User)