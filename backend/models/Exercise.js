const mongoose = require('mongoose')
const Exercise = mongoose.Schema({
    name : String,
    demonstration_1: String,
    demonstration_2: String,
    demonstration_3: String,
    main: String,
    detailed: String,
    other: String,
    type: String,
    mechanic: String,
    equipment: String,
    difficulty: String,
    muscle_img: String,
    instructions: String,
    })
module.exports = mongoose.model('Exercise', Exercise)