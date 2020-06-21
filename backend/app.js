const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')

// routes import here
const userRoute = require('./routes/user')

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, authorization"
    )
    res.setHeader("Access-Control-Allow-Methods", "POST, DELETE, GET, PUT")
    next()
})

// serve angular
app.use('/',(req, res, next) => {
  res.sendFile(express.static(path.resolve(__dirname, '..', '..', 'vision', 'dist', 'vision', 'index.html')))
})
app.use('/user', userRoute)


// set database URL:
const dbURL = 'mongodb+srv://andy123:123@cluster0-esicd.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority'

// connect mongoose to Mongodb
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, (err) => {
    if (err) {
      console.log(err)
    }
    else {
      console.log('mongoose connected')
    }
})


module.exports = app