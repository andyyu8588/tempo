const express = require('express')
const router = express.Router()
const User = require("../models/User")

// adds new user to the database upon registration
router.post('/create', (req, res, next) => {
    User.find({username : req.body.username}, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err
            })
        } else if (result.length == 0) {
            const user = new User({
                username : req.body.username,
                password : req.body.password  
            })
            console.log('user created!')
            user.save()
            res.status(200).json({
                message: `Success! ${req.body.username} has been created.`
            })
        } else {
            res.status(202).json({
                message: 'user exists'
            })
        }
    })
})

// sets user preferences
router.post('/preferences', (req, res, next) => {
    User.findOneAndUpdate({username : req.body.username},
        {$set: {difficulty: req.body.difficulty,
                equipment: req.body.equipment,
                bodyPart: req.body.bodyPart,
                workoutDuration: req.body.workoutDuration}})
    .exec((err, user) => {
        if (err) {
            res.status(500).json({
                error: err
            })
        } else {
            res.status(200).json({
                message: `Success! ${req.body.username} now has preferences.`
            })
        }            
    })    
})

// adds a workout the the user blacklist
// takes in an object with keys username and name
router.post('/add', (req, res, next) => {
    User.findOneAndUpdate({username : req.body.username},
        {$push: {blacklist : req.body.name}}, (err) => {
            if (err) {
                res.status(500).json({
                    error: err
                })
            }
            else {
                res.status(200).json({
                    message: `Success! ${req.body.name} added to ${req.body.username} blacklist!`
                })
            }
    })
})

// adds exercise
router.post('/exercise', (req, res, next) => {
    User.findOne({username : req.body.username}, (err, result) => {
        if (err) {
                res.status(500).json({
                    error: err
                })
            }
        else {
            if (result.history.length == 0) {//first instantiation
                result.history.push({
                    date : req.body.date,
                    workouts : [{time : req.body.time, value : req.body.exercises}],
                })
                result.save()
                res.status(200).json({
                    message: `Success! Workout added!`
                })   
            }//appends to current day
            else if (result.history[result.history.length-1].date == req.body.date) {
                console.log('appended to current history')
                result.history[result.history.length-1].workouts.push(
                    {type : req.body.time, value : req.body.exercises}
                )
                result.save()
                res.status(200).json({
                    message: `Success! Workout added!`
                })
            }
            else { //create new history
                console.log('new history created')
                result.history.push({
                    date : req.body.date,
                    workouts : [{type : req.body.time, value : req.body.exercises}],
                })
                result.save()
                res.status(200).json({
                    message: `Success! Workout added!`
                })                    
            }       
        }
    })
})

// returns the user, takes in the username
router.get('', (req, res, next) => {
    User.find({username : req.query.username}, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err
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
                error: err
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

// verifies login
router.get('/login', (req, res, next) => {
    User.find({username : req.query.username}.exec((err, res) => {
        if (err) {
            res.status(500).json({
                error: err
            })
        }
        else {
            if (res[0].password == req.params.password) {
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