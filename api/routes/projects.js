// import Project from '../models/project.models'
const express = require('express');
const Project = require('../models/project.models.js')

const project1 = new Project(1, "project1", "Clint", "Cass", "https://github.com/NilK15/projectmanagement-backend", ["javascript", "nodejs", "react"], "Project applicatiooone")
const project2 = new Project(2, "project2", "Nil", "Chris", "https://github.com/NilK15/projectmanagement-backend", ["javascript", "nodejs", "react"], "Project applicatiooone")
const project = [project1, project2]

const Router = express.Router();

// This is a server, handling requests and based on those request message, we send certain data matching the data request
// Think of creating api requests - similar to twitter getting data requests like tweets.

// These are endpoints - similar to little areas of information for people to retrieve informatio (like an API)
Router.get('/', (req, res) => {
    res.send(project)
})

Router.post('/', (req, res) => {
    var body = req.body;
    project.push(body)
    console.log("POSTED")
    res.send(project)
})

Router.delete('/', (req, res) => {
    const { id } = req.params;
    console.log("DELETED")
    project.splice(id, 1)
    res.send(project)
})

// Update method to update Project attributes
Router.put('/', (req, res) => {
    // grabs and sets id/author as variable
    const { id } = req.params;
    const body = req.body;

    project.forEach(element => {
        if (element.id == id) {
            const newElement = { ...element, ...body }
            //This is changing the actual value of the current elemnt as opposed to using element = req.body, which was more of a reference. Can also use element dot notation such as element.author to change the value which will change at memory loaction also similarly to Object.assign()
            Object.assign(element, newElement)
            res.send(`Updated Project Id: ${id} \n Author Updated To: ${body.author}`);
        }
    });
    res.send("No project to update")
})

module.exports = Router;