const mongoose = require('mongoose')

const User = mongoose.Schema({
    username : String,
    password : String,
    difficulty : {type : [String], default : ['Beginner','Intermediate','Expert']},
    equipment : {type : [String], default : ['Body Only']},
    bodyPart : {type : [String], default : ['Abs','Back','Biceps','Chest','Forearm', 'Glutes', 'Shoulders', 'Triceps', 'Upper Legs', 'Lower Legs', 'Cardio']},
    workoutDuration : {type : Number, default : 5},
    history:[{
        date : String,// must not include hours or minutes
        workouts : [{time : String, value : [String]}], 
    }],
    blacklist:{type : [String], default : []}
})

module.exports = mongoose.model('User', User)