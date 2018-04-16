console.log('in server.js');
// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.json());
// Require path
var path = require('path');
var mongoose = require('mongoose');
app.use(express.static(path.join(__dirname, './static')));
// Added for Angular - needs Express folder name not app
app.use(express.static( __dirname + '/APIApp/dist' ));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Use native promises
mongoose.Promise = global.Promise;



// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});