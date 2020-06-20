//import models
const User = require("../models/User");

//adds new user to the database upon registration
const createUser = (userData) => {

    const user = new User({
        username : userData.username,
        password : userData.password,
        difficulty : userData.difficulty,
        equipment : userData.equipment,
        bodyPart : userData.bodyPart,
        workoutDuration : userData.workoutDuration,
    })
    console.log('user created!')
    user.save()
}
//adds a workout the the user blacklist
//takes in an object with keys username and name
const addToBlacklist = (exData) => {
    User.findOneAndUpdate({username : exData.username},
        {$push:{blacklist : exData.name}}, (err) =>{
            if (err) {
                console.log(err)
            }
            else{
                console.log(exData.name + ' added to ' + exData.username + ' blacklist!')
            }
        }

    )}
//returns true if workout is in blacklist
//takes in username and name
const checkBlacklisted = (data) => {
    return new Promise((resolve, reject) => {
        User.find({username : data.username}.exec((err,res)=>{
            if (err){
                reject(err)
            }
            else{
                if (res[0].blacklist.includes(data.name)){
                    console.log( data.name + ' is blacklisted!')
                    resolve(true)
                }
                else{
                    resolve(false)
                }
            }
        })
    )}
)}

//update user history
//takes in object containing username, date, time and exercises
const updateHistory = (data) => {

    User.findOneAndUpdate({username : data.username},
        {$push:{ history,[history.length-1] : 'asd' }}
    
        )

}



module.exports = {createUser, addToBlacklist, checkBlacklisted}

// res[0].update({$push:{ history :{
//     date : data.date,
//     workouts : [{
//         time : data.time,
//         exercises : [data.exercises]
//     }]
// } }})