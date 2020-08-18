// Setup empty JS object to act as endpoint for all routes
let projectData = [];

// Initialize all dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server
const port = 9000;
const listening = () => {
    console.log(`The server is now running at localhost:${port}`);
};

// Routes
// get route to retrieve data from object
app.get('/api', (req, res) => {
    res.status(200).send(projectData);
});


// post route to store the data for new trip in existing trips object
app.post('/api/post', (request, response) => {
    const trip = request.body;
    projectData.push(trip);
    response.status(201).send(projectData);
});

app.listen(port, listening);