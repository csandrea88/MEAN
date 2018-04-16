// session requirement:
var session = require('express-session');
// Load the express module
var express = require("express");
// invoke var exprness and store the resulting application in var app
var app = express();
//more new code
app.use(session({secret: 'codingdojorocks'}));  // string for encryption
// This sets the location where express will look for the ejs viewscopy
app.set('views', __dirname + '/views'); 
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');

// lets handle the base route "/" and respond with "Hello Express"
app.get('/', function(request, response) {
    if (request.session.count) {
        request.session.count += 1;
    } else {
        request.session.count = 1;
    }
    response.render('Counter', {count: request.session.count});
})







//Always at the end of server.js
  // Tell the express app to listen on port 8000
  app.listen(8000, function() {
    console.log("listening on port 8000");
})