//middle ware api
var bodyParser = require('body-parser')
const express = require('express')
//Express instance
const app = express()
const port = 3000


//middle ware (stuff done before it gets to last portion of its journey)
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const project = ["project1", "project2"]
// this is a server, handling requests and based on those request message, we send certain data matching the data request
// think of creating api requests - similar to twitter getting data requests like tweets.

// these are endpoints - similar to little areas of information for people to retrieve informatio (like an API)
app.get('/project', (req, res) => {
    res.send(project)
})

app.post('/project', (req, res) => {
    var body = req.body;
    console.log(body)
    project.push(body["projectName"])
    res.send(project)
})

app.delete('/project/:id', (req, res) => {
    const {id} = req.params;
    // console.log(projectIndex)
    project.splice(id,1)
    res.send(project)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


//TODO - convert project strings to object arrays
//Add properties, at the very least with ID and Name
//Convert endpoint functions to deal with array of objects instead of strings
//edit postman post body to work with objects
//add update endpoint