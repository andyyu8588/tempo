const http = require('http')
const app = require('./backend/app')

// setup http server (https in heroku tho)
const PORT = process.env.PORT || 3000
const server = http.createServer(app)

// open server 
server.listen(PORT, () => {
  console.log('Server started on port ' + PORT)
})