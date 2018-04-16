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
mongoose.connect('mongodb://localhost/PostCommuse');
var Schema = mongoose.Schema;
// define Post Schemacopy
var PostSchema = new mongoose.Schema({
 text: {type: String, required: true }, 
 comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true });
// define Comment Schema
var CommentSchema = new mongoose.Schema({
 _post: {type: Schema.Types.ObjectId, ref: 'Post'},
 ctext: {type: String, required: true }
}, {timestamps: true });
// set our models by passing them their respective Schemas
mongoose.model('Post', PostSchema);
mongoose.model('Comment', CommentSchema);
// store our models in variables
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Use native promises
mongoose.Promise = global.Promise;

app.get('/', function (req, res) {
    Post.find({})
    .populate('comments')
    .exec(function(err, posts) { 
        res.render('index', {posts: posts});
    });
});

app.post('/addPost', function(req, res) {
    console.log("in /addPost route")
    console.log("POST DATA", req.body);
    var post = new Post({text: req.body.text});
    // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    post.save(function(err) {
      // if there is an error console.log that something went wrong!
      if(err) {
        console.log('unsuccessfully added!'); 
        res.render('index', {errors: err.errors})
      } else { // else console.log that we did well and then redirect to the root route
        console.log('successfully added!');
        res.redirect('/');
      }
    });
});
app.post('/addComm/:id', function (req, res){
    Post.findOne({_id: req.params.id}, function(err, post){
           var comment = new Comment(req.body);
                comment._post = post._id;
           
           post.comments.push(comment);
           comment.save(function(err){
                post.save(function(err){
                         if(err) { console.log('Error'); } 
                         else { res.redirect('/'); }
                   });
           });
    });
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});
