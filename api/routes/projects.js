const Project = require('../models/project.models.js')
const express = require('express')
const Router = express.Router()


// Hard coded placeholder project object information
// const project1 = new Project(1, "project1", "Clint", "Cass",
//     "https://github.com/NilK15/projectmanagement-backend", ["javascript",
//     "nodejs", "react"], "Project applicatiooone")
// const project2 = new Project(2, "project2", "Nil", "Chris",
//     "https://github.com/NilK15/projectmanagement-backend", ["javascript",
//     "nodejs", "react"], "Project applicatiooone")
// const project3 = new Project(3, "project3", "Nil", "Clint", "www.yahoo.com",
//     "string", "description")
// const project = [project1, project2, project3]
const project = []


// Error handler function
// msg = "project array does not exist" default assignment not working
function errorHandler(req, res, msg, status, post = false) {
    let newMsg = msg;
    if (typeof project === 'undefined') {
        newMsg = "The Project Array Does Not Exist"
        let error = new Error(newMsg);
        res.status(status).json({
            error: error.message
        })
    }
    else if (project[0] == null && post == false) {
        if (req.method == "delete") {
            let error = new Error(newMsg);
            res.status(status).json({
                error: error.message
            })
        }
        else {
            let error = new Error(newMsg);
            // res.status = status;
            res.status(status).json({
                message: {
                    error: error.message
                }
            })
        }
        // next(error);
    }
    else if (post == false) {
        project.pop();
        res.send(project);

    }
    else if (post == true) {
        var body = req.body;
        project.push(body);
        res.send(project);
    }
    else {
        res.send(project);
    }
}

// This is a server, handling requests and based on those request message, we send certain data matching the data request
// Think of creating api requests - similar to twitter getting data requests like tweets.

// These are endpoints - similar to little areas of information for people to retrieve information (like an API)
Router.get('/', (req, res, next) => {
    errorHandler(req, res, "No Projects Found", 404);
    // res.send(project)
})

Router.post('/', (req, res) => {
    // var body = req.body;
    errorHandler(req, res, "No Project Array to Store Project", 404, true);
    // project.push(body);
    // res.send(project);
})

// Deletes last entry
Router.delete('/', (req, res, next) => {

    errorHandler(req, res, "No Projects to Delete", 404)
    // project.pop();
    // res.send(project);
})

Router.delete('/:id', (req, res, next) => {
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
    if (idExists) {
        return;
    }
    else {
        errorHandler(req, res, "Project with the ID " + id + " does not exist", 404);
    }

})

// Update method to update Project attributes
Router.put('/:id', (req, res) => {
    // grabs and sets id/author as variable
    const { id } = req.params;
    const body = req.body;
    errorHandler(res, "No Project to Update", 404)
    project.forEach(element => {
        if (element.id == id) {
            const newElement = { ...element, ...body }
            //This is changing the actual value of the current elemnt as
            //opposed to using element = req.body, which was more of a
            //reference. Can also use element dot notation such as
            //element.author to change the value which will change at
            //memory loaction also similarly to Object.assign()
            Object.assign(element, newElement)
            res.send(newElement);
            // res.send(`Updated Project Id: ${id} \n Author Updated To:
            // ${body.author}`);
        }
    });
    errorHandler(req, res, "No Project ID Match to Update", 404);
})
module.exports = Router;
