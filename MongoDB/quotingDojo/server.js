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
mongoose.connect('mongodb://localhost/quotingDojo');
var QuoteSchema = new mongoose.Schema({
    name: {type:String, required: "Name is Required, please enter"},
    quote: {type:String, required:true},
    created_at: {type: Date, default: Date.now}
   })
   mongoose.model('Quote', QuoteSchema); // We are setting this Schema in our Models as 'Quote'
   var Quote = mongoose.model('Quote') // We are retrieving this Schema from our Models, named 'Quote'
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
    res.render('index');
});
app.get('/results', function(req, res) {
    Quote.find({$query: {}, $orderby:{ created_at: -1 }}, function(err, quotes) {
        //quotes.sort({ created_at: 1 });
        if (err) {
            res.render('index', {errors: quotes.errors})
            //console.log('Find all users failed');
        } else { // else console.log that we did well and then redirect to the root route
            console.log(quotes);
            res.render('results', {quotes: quotes});
            console.log('successfully found quotes!');    
        };
    });      
});

// Add User Request 
app.post('/quotes', function(req, res) {
    console.log("in /quotes route")
    console.log("POST DATA", req.body);
    var quote = new Quote({name: req.body.name, quote: req.body.quote});
    // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    quote.save(function(err) {
      // if there is an error console.log that something went wrong!
      if(err) {
        console.log('unsuccessfully added a quote!'); 
        res.render('index', {errors: quote.errors})
      } else { // else console.log that we did well and then redirect to the root route
        console.log('successfully added a quote!');
        res.redirect('/results');
      }
    });
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});
