// This is a server, handling requests and based on those request message, we send certain data matching the data request
// Think of creating api requests - similar to twitter getting data requests like tweets.

const Project = require('../models/project.models.js')
const express = require('express')
const Router = express.Router()
const sqlite3 = require('sqlite3').verbose()

// intializes project array to hold temporary project objects
const project = []

// establish connection to sqlite db file with read/write permissions
const db = new sqlite3.Database("./database/test.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});


// These are endpoints - similar to little areas of information for people to retrieve information (like an API)
Router.get('/', (req, res) => {
    if (typeof project === 'undefined') {
        let error = new Error("The project array does not exist");
        res.status = 404;
        res.json({
            error: error.message
        })
    }
    // else if (project.length == 0) {
    //     let error = new Error("No existing projects to receive");
    //     res.status = 404;
    //     res.json({
    //         message: {
    //             error: error.message
    //         }
    //     })
    // }
    else {
        let stmt = "SELECT * FROM Project";
        let projectsArray = [];
        db.all(stmt, [], (err, rows) => {
            if (err) return console.error(err.message);
            rows.forEach((row) => {
                console.log(row);
                // res.send(row);
                projectsArray.push(row)
            });
            res.send(projectsArray);
        });
        // db.close();
        // res.send(project)
    }
})

Router.post('/', (req, res) => {
    let insertProject = "INSERT INTO Project(projectName, manager, author, gitUrl, projectStack, description) VALUES (?,?,?,?,?,?)";
    if (typeof project === 'undefined') {
        let error = new Error("The project array does not exist");
        res.status = 404;
        res.json({
            error: error.message
        })
    }
    else {
        let body = req.body;
        db.run(insertProject, [body.projectName, body.manager, body.author, body.gitUrl, body.projectStack, body.description], (err) => {
            if (err) return console.error(err.message);
        });
        res.send("Updated test.DB");
        // db.close();
        // project.push(body);
        // res.send(project);
    }
})

// delete from marks
// order by id desc limit 1
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
    // else if (project.length == 0) {
    //     let error = new Error("There are no projects to delete.");
    //     res.status = 404;
    //     res.json({
    //         error: error.message

    //     })
    // }
    else {
        let deleteData = 'DELETE FROM Project WHERE id = (SELECT MAX(id) FROM Project);'
        db.run(deleteData, [], (err) => {
            if (err) return console.error(err.message);
        });
        res.send("Deleted latest entry");
        // project.pop();
        // res.send(project);
    }
})
Router.delete('/:id', (req, res) => {
    let deleteData = 'DELETE FROM Project WHERE id = ?'
    const { id } = req.params;
    db.run(deleteData, [id], (err) => {
        if (err) return console.error(err.message);
    });
    res.send("Deleted Project with id: " + id);
    // let idExists = false;
    // for (let i = 0; i < project.length; i++) {
    //     if (project[i].id == id) {
    //         idExists = true;
    //         let aproject = project.filter(element => element.id != id);
    //         for (let i = 0; i < project.length; i++) {
    //             project.pop();
    //         }
    //         Object.assign(project, aproject);
    //         res.send(project);
    //     }
    // }
    // if (idExists == false) {
    //     let error = new Error("The project with ID " + id + " does not exist.");
    //     res.status = 404;
    //     res.json({
    //         error: error.message
    //     })
    // }
})

// Update method to update Project attributes
Router.put('/:id', (req, res) => {
    // grabs and sets id/author as variable
    const { id } = req.params;
    const body = req.body;
    // let idExists = false;
    if (typeof project === 'undefined') {
        let error = new Error("The project array does not exist.");
        res.status = 404;
        res.json({
            error: error.message
        })
    }
    // else if (project.length == 0) {
    //     let error = new Error("There are no existing projects to update.");
    //     res.status = 404;
    //     res.json({
    //         error: error.message
    //     })
    // }
    else {
        let updateTable = 'Update Project SET author = ? WHERE id = ?';
        db.run(updateTable, [body.author, id], (err) => {
            if (err) return console.error(err.message);

        });
        res.send(id);
        //    project.forEach(element => {
        //        if (element.id == id) {
        //            idExists = true;
        //            const newElement = { ...element, ...body }
        //            //This is changing the actual value of the current elemnt as
        //            //opposed to using element = req.body, which was more of a
        //            //reference. Can also use element dot notation such as
        //            //element.author to change the value which will change at
        //            //memory loaction also similarly to Object.assign()
        //            Object.assign(element, newElement)
        //            res.send(newElement);
        //        }
        //    });
        //    if (idExists == false) {
        //        let error = new Error("The project with ID " + id + " does not exist.");
        //        res.status = 404;
        //        res.json({
        //            error: error.message
        //        })
        //    }
    }
})

module.exports = Router;



// db.serialize(() => {
//     // db.run("CREATE TABLE IF NOT EXISTS Project (projectName TEXT)");
//     // const stmt = db.prepare("INSERT INTO Project VALUES (?)");
//     // for (let i = 0; i < 10; i++) {
//     //     stmt.run("Project" + i);
//     // }
//     // stmt.finalize();
//     const tableArray = [ProjectTable]
//     tableArray.forEach((table) => db.run(table.TableQuery))
//     // db.run("SELECT * FROM Project", (err, row) => {
//     //     console.log(row.value);s
//     // });
//     db.each("SELECT projectName AS id, projectName FROM Project", (err, row) => {
//         console.log(row.id + ": " + row.projectName);
//     });
// });



