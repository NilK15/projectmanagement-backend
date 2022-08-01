const Project = require('../models/project.models.js')
const express = require('express')
const Router = express.Router()
const db = require('../../services/db.js')

// Gets all current projects in database
Router.get('/', (req, res, next) => {
    try {
        let stmt = "SELECT * FROM Project";
        let projectsArray = [];
        db.all(stmt, [], (err, rows) => {
            if (err) throw new Error(err.message);
            rows.forEach((row) => {
                projectsArray.push(row)
            });
            res.send(projectsArray);
        });
    } catch (error) {
        console.log(error.message)
        next(error);
    }
})

// Adds a random project object to database
Router.post('/', (req, res) => {
    try {
        let insertProject = "INSERT INTO Project(projectName, manager, author, gitUrl, projectStack, description) VALUES (?,?,?,?,?,?)";
        let body = req.body;
        db.run(insertProject, [body.projectName, body.manager, body.author, body.gitUrl, body.projectStack, body.description], (err) => {
            if (err) throw new Error(err.message);
        });
        res.send("Added project to project table");
    } catch (error) {
        console.log(error.message)
        next(error);
    }
})

// Deletes last entry in database
Router.delete('/', (req, res) => {
    try {
        //No Projects to Delete
        let deleteData = 'DELETE FROM Project WHERE id = (SELECT MAX(id) FROM Project);'
        db.run(deleteData, [], (err) => {
            if (err) return console.error(err.message);
        });
        res.send("Deleted latest entry from project table");
    } catch (error) {
        console.log(error.message)
        next(error);
    }
})

// Deletes specific project based on id from database
Router.delete('/:id', (req, res) => {
    try {
        let deleteData = 'DELETE FROM Project WHERE id = ?'
        const { id } = req.params;
        db.run(deleteData, [id], (err) => {
            if (err) return console.error(err.message);
        });
        res.send("Deleted project with id " + id + " from the project table");
    } catch (error) {
        console.log(error.message)
        next(error);
    }
})

// Update method to update project based on id from database
Router.put('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        let updateTable = 'Update Project SET author = ? WHERE id = ?';
        db.run(updateTable, [body.author, id], (err) => {
            if (err) return console.error(err.message);
        });
        res.send("Updated project " + id + "'s details");
    } catch (error) {
        console.log(error.message)
        next(error);
    }
})

module.exports = Router;
