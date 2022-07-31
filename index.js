const bodyParser = require('body-parser');
const express = require('express');
const projectRoutes = require('./src/routes/projects.js');
const ProjectTable = require('./src/models/project.table.js');
const morgan = require('morgan');
const db = require('./services/db.js');

// Expess instance declaration
const app = express();

// Port utilized
const port = 3000;

// Creates project table using SQL statement as paramater of SQLite3 method
db.run(ProjectTable.TableQuery);

// Morgan API used for logging diagnostics to console 
app.use(morgan('dev'));

// Middleware parsing of URL and JSON type content-type headers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes to projects.js domain
app.use('/projects', projectRoutes);

// If no routes match, then handles all other requests that make it this far - not found which is what server 404 message is for.
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

// Handles forwarded error messages
app.use((error, req, res) => {
    res.status = error.status || 500;
    res.json({
        error: {
            message: error.message
        }
    });
});

// Starts server to listen for requests
app.listen(port, () => {
    console.log("Starting server on port: " + port);
});
