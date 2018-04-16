// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');
// Require Mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');
var UserSchema = new mongoose.Schema({
    name: {type:String, required:true, minlength:2},
    age: {type:Number, required:true, min:18, max:100}
   })
   mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
   var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'User'
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Use native promises
mongoose.Promise = global.Promise;

// Routes
// Root Request
app.get('/', function(req, res) {
    User.find({}, function(err, users) {
        if (err) {
            res.render('index', {errors: users.errors})
            //console.log('Find all users failed');
        } else { // else console.log that we did well and then redirect to the root route
            console.log(users);
            res.render('index', {users: users});
            console.log('successfully found users!');    
        };
    });      
});

// Add User Request 
app.post('/users', function(req, res) {
    console.log("in /users route")
    console.log("POST DATA", req.body);
    var user = new User({name: req.body.name, age: req.body.age});
    // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    user.save(function(err) {
      // if there is an error console.log that something went wrong!
      if(err) {
        console.log('unsuccessfully added a user!'); 
        res.render('index', {errors: user.errors})
      } else { // else console.log that we did well and then redirect to the root route
        console.log('successfully added a user!');
        res.redirect('/');
      }
    });
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});
