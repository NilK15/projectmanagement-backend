
//middle ware api to do stuff to the body
var bodyParser = require('body-parser')
const express = require('express')
//Express instance
const app = express()
const port = 3000


// Middle ware (stuff done before it gets to last portion of its journey)
app.use(bodyParser.urlencoded({ extended: false }))

// Parse application/json
app.use(bodyParser.json())

//changing projects to object projects
// const project = ["project1", "project2"]

function Project(id, projectName, manager, author) {
    this.id = id;
    this.projectName = projectName;
    this.manager = manager;
    this.author = author;
}

const project1 = new Project(1, "project1", "Clint", "Build something right for once")
const project2 = new Project(2, "project2", "Nil", "Nilio")

const project = [project1, project2]

// This is a server, handling requests and based on those request message, we send certain data matching the data request
// think of creating api requests - similar to twitter getting data requests like tweets.

// these are endpoints - similar to little areas of information for people to retrieve informatio (like an API)
app.get('/project', (req, res) => {
    res.send(project)
})

app.post('/project', (req, res) => {
    var body = req.body;
    project.push(body)
    console.log("POSTED")
    res.send(project)
})

app.delete('/project/:id', (req, res) => {
    const { id } = req.params;
    console.log("DELETED")
    project.splice(id, 1)
    res.send(project)
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// update method to update another existing object's author - is it possible to submit several put requests such as author/name or just author, or just name for one put method or will each one of those require a new put method (one for each attribute)?
app.put('/project/:id/:author', (req, res) => {

    // grabs and sets id/author as variable
    const { id } = req.params;
    const { author } = req.params;

    project.forEach(element => {
        if (element.id == id) {
            element.author = author;
            res.send("Updated Project Id: " + id + "\n Author Updated To: " + author);
        }
        else {
            res.send("No project to update")
        }
    });

})
app.listen(port, () => {

    console.log("Starting server on port: " + port)
})


//TODO - convert project strings to object arrays - Done
//Add properties, at the very least with ID and Name - Done
//Convert endpoint functions to deal with array of objects instead of strings - Done
//edit postman post body to work with objects - Done
//add update endpoint - done
