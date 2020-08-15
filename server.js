// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
const cors = require('cors');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const listening = () => {
    console.log(`The server is now running at localhost:${port}`);
};

// Routes
// get route to retrieve data from object
app.get('/api/get', (request, response) => {
    response.status(200).send(projectData);
});

// post route to store the data for new entry in existing object
app.post('/api/post', (request, response) => {
    projectData['date'] = request.body.date;
    projectData['temp'] = request.body.temp;
    projectData['location'] = request.body.location;
    projectData['content'] = request.body.content;

    response.status(201).send(projectData);
});

app.listen(port, listening);