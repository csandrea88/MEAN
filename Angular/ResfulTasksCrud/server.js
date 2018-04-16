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
mongoose.connect('mongodb://localhost/taskDb');
var TaskSchema = new mongoose.Schema({
    title: {type:String},
    descriptn: {type: String, default:" "},
    completed: {type: Boolean, default: false},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
})
   mongoose.model('Task', TaskSchema); // We are setting this Schema in our Models as 'Quote'
   var Task = mongoose.model('Task') // We are retrieving this Schema from our Models, named 'Quote'
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Added for Angular - needs Express folder name not app
app.use(express.static( __dirname + '/ResTasks/dist' ));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Use native promises
mongoose.Promise = global.Promise;

// app.get('/', (req, res) => {
//     res.json({message: "Success", data: tasks})
// });

app.get('/tasks', (req, res) => {
    console.log("in get tasks");
    Task.find({}, function(err, tasks){
        if(err){
           console.log("Returned error", err);
            // respond with JSON
           res.json({message: "Error", error: err})
        }
        else {
            // respond with JSON
           res.json({message: "Success", data: tasks})
        }
     })
})
app.get("/tasks/:id", (req, res) => { 
    Task.findOne({_id: req.params.id}, function(err, task){
        if(err){
           console.log("Returned error", err);
            // respond with JSON
           res.json({message: "Error", error: err})
        }
        else {
            // respond with JSON
           res.json({message: "Success", data: task})
        }
    });
});

app.post("/task", function(req, res) {
    console.log("in post tasks");
    console.log("req.body: ",req.body);
    console.log("req.params: ",req.params);
    
    var task = new Task({
        title: req.body.title,
        descriptn: req.body.descriptn
    });
    console.log("task: ", task);
    // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    task.save(function(err) {
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
app.put("/task/:id", (req, res) => { 
    Task.findOne({_id: req.params.id}, function(err, task){
        console.log("RBody: ", req.body, "Params: ", req.params);
        
        task.title = req.body.title,
        task.descriptn = req.body.descriptn,
        task.completed = req.body.completed
        
        task.save(function(err){
        
            if(err){
            console.log("Returned error", err);
                // respond with JSON
            res.json({message: "Error", error: err})
            } else {
                // respond with JSON
            res.json({message: "Success", data: task})
            }
        });
    });
})
app.delete("/task/:id", (req, res) => { 
    console.log("req.body: ",req.body);
    console.log("req.params: ",req.params);
    Task.remove({_id: req.params.id}, function(err, task){
        
        if(err){
            console.log("Returned error", err);
            // respond with JSON
            res.json({message: "Error", error: err})
        } else {
            // respond with JSON
            res.json({message: "Success", data: task})
        }
        
    });
});


// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});
