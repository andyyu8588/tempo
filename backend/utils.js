//import models
const User = require("../models/User");

//adds new user to the database upon registration
const createUser = (userData) => {

    const user = new User({
        email : userData.email,
        username : userData.username,
        password : userData.password,
        firstname : userData.firstname,
        lastname : userData.lastname,
        birthdate : userData.birthdate,
        gender : userData.gender  
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

module.exports = {createUser, addToBlacklist, checkBlacklisted}