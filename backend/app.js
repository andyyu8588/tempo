const express = require('express')
const app = express()
const path = require('path')

// routes import here


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

module.exports = app