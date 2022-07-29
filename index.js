const bodyParser = require('body-parser')
const express = require('express')
const projectRoutes = require('./api/routes/projects.js')
const morgan = require('morgan')

// Express instance
const app = express()
const port = 3000

//Morgan allows to log something while request continues to move on (check
//console) 'dev' is the form of the output
app.use(morgan('dev'))

// Middle ware (stuff done before it gets to last portion of its journey)
// Parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Routes to projects.js domain
app.use('/projects', projectRoutes);

// If no routes match, then handles all other requests that make it this far - not found which is what server 404 message is for.
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
})

// Handles forwarded error messages
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})



// Starts server to listen for requests
app.listen(port, () => {
    console.log("Starting server on port: " + port)
})
