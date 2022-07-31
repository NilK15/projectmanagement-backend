const bodyParser = require('body-parser')
const express = require('express')
const projectRoutes = require('./src/routes/projects.js')
const ProjectTable = require('./src/models/project.table.js')
const morgan = require('morgan')
const sqlite3 = require('sqlite3').verbose()

// Express instance
const app = express()
const port = 3000


// ------ Database Connection ------ /.

// new connection to existing database with read/write functionality
const db = new sqlite3.Database("./database/test.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});

// sql statement to create Project table
let createProjectTable = 'CREATE TABLE IF NOT EXISTS Project(id INTEGER PRIMARY KEY, projectName, manager, author, gitUrl, projectStack, description)';

//creates project table 
db.run(createProjectTable);

// db.close();

// -------------------------------- / 

//Morgan allows to log something while request continues to move on (check
//console) 'dev' is the form of the output
app.use(morgan('dev'))

// Middle ware (stuff done before it gets to last portion of its journey)
// Parse application/json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes to projects.js domain
app.use('/projects', projectRoutes);

// If no routes match, then handles all other requests that make it this far - not found which is what server 404 message is for.
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
})

// Handles forwarded error messages
app.use((error, req, res) => {
    res.status = error.status || 500;
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
