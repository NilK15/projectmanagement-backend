
const bodyParser = require('body-parser')
const express = require('express')
const projectRoutes = require('./api/routes/projects.js')


// Express instance
const app = express()
const port = 3000

// Middle ware (stuff done before it gets to last portion of its journey)
// Parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/projects', projectRoutes);


// Starts server to listen for requests
app.listen(port, () => {
    console.log("Starting server on port: " + port)
})
