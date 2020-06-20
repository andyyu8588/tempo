//import models
const User = require("../models/User");
const Exercise = require("../models/Exercise");


//creates global database upon initial instantiation
const createDatabase = (data)=>{
    data.forEach(element => {
        const exercise = new Exercise({
            name : element.name,
            demonstration_1 : element.demonstration_1,
            demonstration_2 : element.demonstration_2,
            demonstration_3 : element.demonstration_3,
            main : element.main,
            detailed : element.detailed,
            other : element.other,
            type : element.type,
            mechanic : element.mechanic,
            equipment : element.equipment,
            difficulty : element.difficulty,
            muscle_img : element.muscle_img,
            instructions : element.instructions,
            })
        exercise.save()
    });
}

//adds new user to the database upon registration
const createUser = (userData) => {

    const user = new User({
        email : data.email,
        username : data.username,
        password : data.password,
        firstname : data.firstname,
        lastname : data.lastname,
        birthdate : data.birthdate,
        gender : data.gender  
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
        User.find({username : data.username}.exec((res,err)=>{
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

module.exports = {createDatabase, createUser, addToBlacklist, checkBlacklisted}