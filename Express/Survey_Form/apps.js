 var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
// // create the express app
var app = express();
// //get the http module:
var http = require('http');
// // fs module allows us to read and write content for responses!!
var fs = require('fs');

// static content
// app.use(express.static(path.join(__dirname, "./static")));
// // setting up ejs and our views folder
// app.set('views', path.join(__dirname, './views'));
//app.set('view engine', 'ejs');


// creating a server using http module:
// var server = http.createServer(function (request, response){
//     // see what URL the clients are requesting:
//     console.log('client request URL: ', request.url);
//     app.post('/process', function(request, response) {
//         res.render('results', 
//             {FNameO: request.fname},
//             {LNameO: request.lname},
//             {AgeO: request.age},
//             {EmailO: request.email}
//         );
//     })
// });









//Always at the end of server.js
// Tell the express app to listen on port 8000
 app.listen(8000, function() {
     console.log("listening on port 8000");
 });
