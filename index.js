const bodyParser = require('body-parser')
const express = require('express')
const projectRoutes = require('./src/routes/projects.js')
const ProjectTable = require('./src/models/project.table.js')
const morgan = require('morgan')
const sqlite3 = require('sqlite3').verbose()

// Express instance
const app = express()
const port = 3000

//new connectino to existing database, maybe
const db = new sqlite3.Database("./database/test.db");

db.serialize(() => {
    // db.run("CREATE TABLE IF NOT EXISTS Project (projectName TEXT)");
    // const stmt = db.prepare("INSERT INTO Project VALUES (?)");
    // for (let i = 0; i < 10; i++) {
    //     stmt.run("Project" + i);
    // }
    // stmt.finalize();

    const tableArray = [ProjectTable]

    tableArray.forEach((table) => db.run(table.TableQuery))

    // db.run("SELECT * FROM Project", (err, row) => {
    //     console.log(row.value);s
    // });

    db.each("SELECT projectName AS id, projectName FROM Project", (err, row) => {
        console.log(row.id + ": " + row.projectName);
    });

});
app.db = db;
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
