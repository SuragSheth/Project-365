// Always start with your server.js file
// The server.js file acts as the home base for your application. 
// This is where you require the routes and the mongoose configurations
// The server.js also creates the express application, loads configurations onto it, 
// and then tells it to listen!

// We are setting up the express application and then requireing 
var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	path = require("path"),
	mongoose = require("mongoose"),
    hostname = process.env.HOSTNAME || 'localhost',
    port = 8080;

// We are defining where the static foler is located at 
app.use(express.static(path.join(__dirname + "/clients/static")));

// We are defining where the views are located in our folder structure
app.set("views", __dirname + "/clients/static");

// Telling out app to use the bodyParser
app.use(bodyParser.json());

// We are requiring mongoose.js which links all of the the mongo schemas or models
require('./server/config/mongoose.js');

// store the function in a variable, and invoce the app
var routes_setter = require('./server/config/routes.js')(app);

// // invoke the function stored in routes_setter and pass it the "app" variable
// routes_setter(app)


// We are starting the server & logging on the terminal where it is listening at 
console.log("Simple static server listening at http://" + hostname + ":" + port);
var server = app.listen(port, hostname);


