console.log('in belt server.js');
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
mongoose.connect('mongodb://localhost/BeltDb');
var Schema = mongoose.Schema;

 var BeltSchema = new mongoose.Schema({
     name: {type:String, required: true, minlength: 3},
     type: {type:String, required: true, minlength: 3},
     description: {type:String, required: true, minlength: 3},
     skill1: {type:String},
     skill2: {type:String},
     skill3: {type:String},
     totlikes: {type:Number},
//     quotes: [{type: Schema.Types.ObjectId, ref: 'Quote'}],
     created_at: {type: Date, default: Date.now},
     updated_at: {type: Date, default: Date.now}
 })
mongoose.model('Belt', BeltSchema); // We are setting this Schema in our Models as 'Quote'
var Belt = mongoose.model('Belt'); // We are retrieving this Schema from our Models, named 'Quote'


// var QuoteSchema = new mongoose.Schema({
//     quote: {type:String, required: true, minlength: 3},
//     totvotes: {type: Number},
//     _author: {type: Schema.Types.ObjectId, ref: 'Author'}, //One Belt to many relatn
//     created_at: {type: Date, default: Date.now},
//     updated_at: {type: Date, default: Date.now}
// })
// mongoose.model('Quote', QuoteSchema); // We are setting this Schema in our Models as 'Quote'
// var Quote = mongoose.model('Quote'); // We are retrieving this Schema from our Models, named 'Quote'

   // Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Added for Angular - needs Express folder name not app
app.use(express.static( __dirname + '/public/dist' ));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));

// Use native promises
mongoose.Promise = global.Promise;

//Belt: get all
app.get('/api/belts', function(req, res) {
    console.log("in get belts");
    Belt.find({}, function(err, belts) {
    //Belt.find({$query: {}, $orderby:{ name: -1 }}, function(err, belts){
    
    console.log('get all results: ', belts);
        if(err){
           console.log("Returned error", err);
            // respond with JSON
           res.json({message: "Error", error: err})
        }
        else {
            // respond with JSON
           res.json({message: "Success", data: belts})
        }
    }).sort( { type: 1 } );
});
//Belt: get by id
app.get("/api/belt/:id", (req, res) => { 
    Belt.findOne({_id: req.params.id}, function(err, belt){
        console.log(belt);
        if(err){
           console.log("Returned error", err);
            // respond with JSON
           res.json({message: "Error", error: err})
        }
        else {
            // respond with JSON
           res.json({message: "Success", data: belt})
        }
    });
});

 
//Belt: Insert
app.post("/api/belt", function(req, res) {
    Belt.findOne({name: req.body.name}, function(err, belt) {
        console.log("belt in add for dupl check:", belt);
        if (!belt) {
            console.log("in belt insert");
            console.log("req.body: ",req.body);
            
            var belt = new Belt({
                name: req.body.name,
                type: req.body.type,
                description: req.body.description,
                skill1: req.body.skill1,
                skill2: req.body.skill2,
                skill3: req.body.skill3,
                totlikes: 0
            });

            console.log("belt: ", belt);
            // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
            belt.save(function(err) {
                // if there is an error console.log that something went wrong!
                console.log("err:", err);
                if(err) {
                    console.log('unsuccessfully added!'); 
                } else { // else console.log that we did well and then redirect to the root route
                    console.log("just before json ");
                    res.json({message: 'Successfully added', data: req.body });
                }
            });
            
        } else {

            res.json({message: 'Pet already exists: UnSuccessfully added', data: req.body });

        }

    });

}); 


//Belt edit by id (Belt)
app.put("/api/editbelt/:id", (req, res) => { 
    Belt.findOne({_id: req.params.id}, function(err, belt){
        console.log("In found a belt to edit ", req.params.id);
        
        belt.name = req.body.name,
        belt.type = req.body.type,
        belt.description = req.body.description,
        belt.skill1 = req.body.skill1,
        belt.skill2 = req.body.skill2,
        belt.skill3 = req.body.skill3


        belt.save(function(err){
        
            if(err){
            console.log("Returned error", err);
                // respond with JSON
            res.json({message: "Error", error: err})
            } else {
                // respond with JSON
            res.json({message: "Success", data: belt})
            }
        });
    });
})

//Belt: Delete 
app.delete("/api/beltdelete/:id", (req, res) => { 
    console.log('in belt delete server')
    console.log("req.params: ",req.params.id);
    Belt.remove({_id: req.params.id}, function(err, belt){
        
        if(err){
            console.log("Returned error", err);
            // respond with JSON
            res.json({message: "Error", error: err})
        } else {
            // respond with JSON
            res.json({message: "Success", data: belt})
        }
        
    });
});

app.get("/api/qvoteup/:id", (req, res) => { 
    console.log("in server gvoteup, req.params.id:", req.params.id)
    Belt.findOne({_id: req.params.id}, function(err, belt){
        //console.log("RBody: ", req.body, "Params: ", req.params);
        console.log("in findone rtn, quote:", belt);
        belt.totlikes++,
        
        belt.save(function(err){
        
            if(err){
            console.log("Returned error", err);
                // respond with JSON
            res.json({message: "Error", error: err})
            } else {
                // respond with JSON
            console.log("in findone rtn, quote:", belt);    
            res.json({message: "Success", data: belt})
            }
        });
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
