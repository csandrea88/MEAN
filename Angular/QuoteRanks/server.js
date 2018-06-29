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
// Require Mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/QuoteRDb');
var Schema = mongoose.Schema;

var AuthorSchema = new mongoose.Schema({
    name: {type:String, required: true, minlength: 3},
    quotes: [{type: Schema.Types.ObjectId, ref: 'Quote'}],
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
})
mongoose.model('Author', AuthorSchema); // We are setting this Schema in our Models as 'Quote'
var Author = mongoose.model('Author'); // We are retrieving this Schema from our Models, named 'Quote'


var QuoteSchema = new mongoose.Schema({
    quote: {type:String, required: true, minlength: 3},
    totvotes: {type: Number},
    _author: {type: Schema.Types.ObjectId, ref: 'Author'},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
})
mongoose.model('Quote', QuoteSchema); // We are setting this Schema in our Models as 'Quote'
var Quote = mongoose.model('Quote'); // We are retrieving this Schema from our Models, named 'Quote'

   // Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Added for Angular - needs Express folder name not app
app.use(express.static( __dirname + '/public/dist' ));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));

// Use native promises
mongoose.Promise = global.Promise;

//get all authors
app.get('/api/authors', (req, res) => {
    console.log("in get authors");
    Author.find({}, function(err, authors){
        if(err){
           console.log("Returned error", err);
            // respond with JSON
           res.json({message: "Error", error: err})
        }
        else {
            // respond with JSON
           res.json({message: "Success", data: authors})
        }
     });
});

//call an author by id
app.get("/api/authorbyid/:id", (req, res) => { 
   console.log("in server.js");
    Author.findOne({_id: req.params.id})
        .populate('quotes')
        .exec(function(err, author) { 
            if(err){
                console.log("Returned error", err);
                    // respond with JSON
                res.json({message: "Error", error: err})
            }
                else {
                    console.log("server author",);
                    // respond with JSON
                    res.json({message: "Success", data: author})
            }
       });
});

//Author: Insert
app.post("/api/author", function(req, res) {

    console.log("in post author");
    console.log("req.body: ",req.body);
    
    var author = new Author({
        name: req.body.name
    });
    console.log("author: ", author);
    // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    author.save(function(err) {
      // if there is an error console.log that something went wrong!
      console.log("err:", err)
      if(err) {
        console.log('unsuccessfully added!'); 
        
      } else { // else console.log that we did well and then redirect to the root route
        console.log("just before json ")
        res.json({message: 'Successfully added', data: req.body });
      }

    });

}) 

//Quote: Insert
app.post("/api/quote/:id", function(req, res) {
    console.log("in post Quote Add");
    Author.findOne({_id: req.params.id}, function(err, author){
        console.log("req.body", req.body);
        var quote = new Quote({
            quote: req.body.quote,
            _author: author._id,
            totvotes: 0
        });

        console.log("Quote: ", quote);
        // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
        quote.save(function(err) {
            author.quotes.push(quote);
            author.save(function(err) {
                // if there is an error console.log that something went wrong!
                console.log("err:", err) 
                if(err) {
                    console.log('unsuccessfully added!'); 
                    
                } else { // else console.log that we did well and then redirect to the root route
                    console.log("just before json ")
                    res.json({message: 'Successfully added', data: req.body });
                }
            });
        });
    });
});

//Quote: vote up
app.get("/api/qvoteup/:id", (req, res) => { 
    console.log("in server gvoteup, req.params.id:", req.params.id)
    Quote.findOne({_id: req.params.id}, function(err, quote){
        //console.log("RBody: ", req.body, "Params: ", req.params);
        console.log("in findone rtn, quote:", quote);
        quote.totvotes++,
        
        quote.save(function(err){
        
            if(err){
            console.log("Returned error", err);s
                // respond with JSON
            res.json({message: "Error", error: err})
            } else {
                // respond with JSON
            res.json({message: "Success", data: quote})
            }
        });
    });
});

//Quote: vote down
app.get("/api/qvotedown/:id", (req, res) => { 
    console.log("in server gvotedown, req.params.id:", req.params.id)
    Quote.findOne({_id: req.params.id}, function(err, quote){
        console.log("in findone rtn, quote:", quote);
        
        quote.totvotes-- ;
        
        quote.save(function(err){
        
            if(err){
            console.log("Returned error", err);
                // respond with JSON
            res.json({message: "Error", error: err})
            } else {
                // respond with JSON
            res.json({message: "Success", data: quote})
            }
            
        });
    });
});

//author edit by id
app.put("/api/editauthor/:id", (req, res) => { 
    Author.findOne({_id: req.params.id}, function(err, author){
        console.log("In found an author to edit ", req.params.id);
        
        author.name = req.body.name

        author.save(function(err){
        
            if(err){
            console.log("Returned error", err);
                // respond with JSON
            res.json({message: "Error", error: err})
            } else {
                // respond with JSON
            res.json({message: "Success", data: author})
            }
        });
    });
})

//Quote: Delete
app.delete("/api/quotedelete/:id", (req, res) => { 
    console.log('in quote delete server')
    console.log("req.params: ",req.params.id);
    Quote.remove({_id: req.params.id}, function(err, quote){
        
        if(err){
            console.log("Returned error", err);
            // respond with JSON
            res.json({message: "Error", error: err})
        } else {
            // respond with JSON
            res.json({message: "Success", data: quote})
        }
        
    });
});

//Catch all routes to allow for Angular routes
app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/index.html"))
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});
