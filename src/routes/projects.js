const Project = require('../models/project.models.js')
const express = require('express')
const Router = express.Router()
const sqlite3 = require('sqlite3').verbose()

const project = []

// This is a server, handling requests and based on those request message, we send certain data matching the data request
// Think of creating api requests - similar to twitter getting data requests like tweets.

// These are endpoints - similar to little areas of information for people to retrieve information (like an API)
Router.get('/', (req, res) => {
    if (typeof project === 'undefined') {
        let error = new Error("The project array does not exist");
        res.status = 404;
        res.json({
            error: error.message
        })
    }
    else if (project.length == 0) {
        let error = new Error("No existing projects to receive");
        res.status = 404;
        res.json({
            message: {
                error: error.message
            }
        })
    }
    else {
        res.send(project)
    }
})

Router.post('/', (req, res) => {
    if (typeof project === 'undefined') {
        let error = new Error("The project array does not exist");
        res.status = 404;
        res.json({
            error: error.message
        })
    }
    else {
        let body = req.body;
        project.push(body);
        res.send(project);
    }
})

// Deletes last entry
Router.delete('/', (req, res) => {
    //No Projects to Delete
    if (typeof project === 'undefined') {
        let error = new Error("The project array does not exist.");
        res.status = 404;
        res.json({
            error: error.message
        })
    }
    else if (project.length == 0) {
        let error = new Error("There are no projects to delete.");
        res.status = 404;
        res.json({
            error: error.message

        })
    }
    else {
        project.pop();
        res.send(project);
    }
})

Router.delete('/:id', (req, res) => {
    const { id } = req.params;
    let idExists = false;
    for (let i = 0; i < project.length; i++) {
        if (project[i].id == id) {
            idExists = true;
            let aproject = project.filter(element => element.id != id);
            for (let i = 0; i < project.length; i++) {
                project.pop();
            }
            Object.assign(project, aproject);
            res.send(project);
        }
    }
    if (idExists == false) {
        let error = new Error("The project with ID " + id + " does not exist.");
        res.status = 404;
        res.json({
            error: error.message
        })
    }
})

// Update method to update Project attributes
Router.put('/:id', (req, res, next) => {
    // grabs and sets id/author as variable
    const { id } = req.params;
    const body = req.body;
    let idExists = false;
    if (typeof project === 'undefined') {
        let error = new Error("The project array does not exist.");
        res.status = 404;
        res.json({
            error: error.message
        })
    }
    else if (project.length == 0) {
        let error = new Error("There are no existing projects to update.");
        res.status = 404;
        res.json({
            error: error.message
        })
    }
    else {
        project.forEach(element => {
            if (element.id == id) {
                idExists = true;
                const newElement = { ...element, ...body }
                //This is changing the actual value of the current elemnt as
                //opposed to using element = req.body, which was more of a
                //reference. Can also use element dot notation such as
                //element.author to change the value which will change at
                //memory loaction also similarly to Object.assign()
                Object.assign(element, newElement)
                res.send(newElement);
            }
        });
        if (idExists == false) {
            let error = new Error("The project with ID " + id + " does not exist.");
            res.status = 404;
            res.json({
                error: error.message
            })
        }
    }
})

module.exports = Router;


