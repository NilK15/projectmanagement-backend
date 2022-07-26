
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
    console.log("what it dew")
    project.push(body)
    res.send(project)
})

app.delete('/project/:id', (req, res) => {
    const { id } = req.params;
    // console.log(projectIndex)
    project.splice(id, 1)
    res.send(project)
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(port, () => {

    console.log("Starting server on port: " + port)
})


//TODO - convert project strings to object arrays
//Add properties, at the very least with ID and Name
//Convert endpoint functions to deal with array of objects instead of strings
//edit postman post body to work with objects
//add update endpoint
