var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');

var app = express();
// use it!
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index", {title: "Survey"});
});
app.post('/process', function(req, res) {
    var output = req.body;
    res.render('results', {Output: output});
});
app.listen(8000, function() {
 console.log("listening on port 8000");
});