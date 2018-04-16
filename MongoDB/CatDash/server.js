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
mongoose.connect('mongodb://localhost/catDash');
var CatSchema = new mongoose.Schema({
    name: {type:String, required:true},
    color: {type:String, required:true},
    created_at: {type: Date, default: Date.now}
   })
   mongoose.model('Cat', CatSchema); // We are setting this Schema in our Models as 'Quote'
   var Cat = mongoose.model('Cat') // We are retrieving this Schema from our Models, named 'Quote'
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
    Cat.find({}, function(err, cats) {
        // quotes.sort({ created_at: 'desc' });
        // Quote.find({}).sort({created_at: -1}).exec(function(err, quotes));
        if (err) {
            res.render('index', {errors: err.errors})
            //console.log('Find all users failed');
        } else { // else console.log that we did well and then redirect to the root route
            console.log(cats);
            res.render('index', {cats: cats});
            console.log('successfully found quotes!');    
        };
    });      
});

// add a Cat 
app.post('/addCat', function(req, res) {
    console.log("in /addCat route")
    console.log("POST DATA", req.body);
    var cat = new Cat({name: req.body.name, color: req.body.color});
    // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    cat.save(function(err) {
      // if there is an error console.log that something went wrong!
      if(err) {
        console.log('unsuccessfully added a cat!'); 
        res.render('index', {errors: err.errors})
      } else { // else console.log that we did well and then redirect to the root route
        console.log('successfully added a cat!');
        res.redirect('/');
      }
    });
});

app.get('/destroyCat/:id', function(req, res) {
    console.log("in /destroyCat route");

    Cat.remove({_id: req.params.id}, function(err, cats){

      if(err) {
        console.log('unsuccessfully destroyed a cat!'); 
        res.render('index', {errors: err.errors})
      } else { // else console.log that we did well and then redirect to the root route
        console.log('successfully destroyed a cat!');
        res.redirect('/');
      }

    });
});

app.get('/showCatEdit/:id', function(req, res) {
    Cat.findOne({_id: req.params.id}, function(err, cat) {
        
        console.log(req.params.id, cat);
        console.log(err);
        if (err) {
            res.render('showCatEdit', {errors: err.errors})
        } else { // else console.log that we did well and then redirect to the root route   
            console.log(cat);
            res.render('showCatEdit', {cat: cat});
            console.log('successfully edited cat!');    
        };
    });      
});


app.post('/editCat/:id', function(req, res) {
    
    Cat.findOne({_id: req.params.id}, function(err, cat){
        cat.name = req.body.name;
        cat.color = req.body.color;
        cat.save(function(err){
        if(err) {
            console.log('unsuccessfully updated a cat!'); 
            res.render('index', {errors: err.errors});
        } else { // else console.log that we did well and then redirect to the root route
            console.log('successfully updated a cat!');
            res.redirect('/');
            }
        });    
    });

});

app.get('/catProfile/:id', function(req, res) {
    Cat.findOne({_id: req.params.id}, function(err, cat) {
        
        console.log(req.params.id, cat);
        console.log(err);
        if (err) {
            res.render('catProfile', {errors: err.errors})
        } else { // else console.log that we did well and then redirect to the root route   
            console.log(cat);
            res.render('catProfile', {cat: cat});
            console.log('successfully edited cat!');    
        };
    });      
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});
