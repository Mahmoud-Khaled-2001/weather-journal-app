// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
/* Dependencies */
const cors = require("cors");

const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server

// Spin up the server
const port = 8000;
try {
  const server = app.listen(port, () => {
    console.log("http://localhost:" + port);
  });
} catch (error) {
  // Callback to debug
  console.log(error);
}
// Initialize all route with a callback function
app.get("/all", sendData);
app.post("/send-data", getData);

// Callback function to complete GET '/all'
function sendData(req, res) {
  // console.log(projectData);
  res.send(projectData);
}

// Post Route
function getData(req, res) {
  projectData.temp = req.body.temp;
  projectData.date = req.body.date;
  projectData.content = req.body.content;
  res.send(projectData);
}
