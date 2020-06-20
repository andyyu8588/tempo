const express = require('express')
const router = express.Router()
const User = require("../models/User")

// adds new user to the database upon registration
router.post('/create', (req, res, next) => {
    const user = new User({
        email : req.body.email,
        username : req.body.username,
        password : req.body.password,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        birthdate : req.body.birthdate,
        gender : req.body.gender  
    })
    console.log('user created!')
    user.save()
    res.status(200).json({
        message: `Success! ${req.body.username} has been created.`
    })
})

// adds a workout the the user blacklist
// takes in an object with keys username and name
router.post('/add', (req, res, next) => {
    User.findOneAndUpdate({username : req.body.username},
        {$push: {blacklist : req.body.name}}, (err) => {
            if (err) {
                res.status(500).json({
                    message: err
                })
            }
            else {
                res.status(200).json({
                    message: `Success! ${req.body.name} added to ${req.body.username} blacklist!`
                })
            }
    })
})

// // adds exercise
// router.post('/exercise', (req, res, next) => {
//     User.findOneAndUpdate({username : req.body.username},
//         {$push: {blacklist : req.body.name}}, (err) => {
//             if (err) {
//                 res.status(500).json({
//                     message: err
//                 })
//             }
//             else {
//                 res.status(200).json({
//                     message: `Success! ${req.body.name} added to ${req.body.username} blacklist!`
//                 })
//             }
//     })  
// )

// returns the user, takes in the username
router.get('/', (req, res, next) => {
    User.find({username : req.params.username}, (err, result) => {
        if (err) {
            res.status(500).json({
                message: err
            })
        } else {
            res.status(200).json({
                user: result
            })
        }
    })
})

// returns true if workout is in blacklist
// takes in username and name
router.get('/check', (req, res, next) => {
    User.find({username : req.params.username}.exec((err, res) => {
        if (err) {
            res.status(500).json({
                message: err
            })
        }
        else {
            if (res[0].blacklist.includes(req.params.name)) {
                res.status(200).json({
                    check: true
                })
            }
            else {
                res.status(200).json({
                    check: false
                })
            }
        }
    }))
})

module.exports = router