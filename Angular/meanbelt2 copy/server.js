console.log('in belt2 server.js');
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
mongoose.connect('mongodb://localhost/Belt2Db');
var Schema = mongoose.Schema;


var BeltSchema = new mongoose.Schema({
    name: {type:String, 
            required: [true, "Name is required, please enter"], 
            minlength: [3, "name must be 3 or longer"] 
    },
    type: {type:String, 
            required: [true, "Type is required, please enter"], 
            minlength: [3, "type must be 3 or longer"] 
    },
    reviews: [{type: Schema.Types.ObjectId, ref: 'Rel'}],
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
 })
mongoose.model('Belt', BeltSchema); // We are setting this Schema in our Models as 'Quote'
var Belt = mongoose.model('Belt'); // We are retrieving this Schema from our Models, named 'Quote'


var RelSchema = new mongoose.Schema({
    review: {type:String, 
        required: [true, "Customer Review is required, please enter"], 
        minlength: [3, "name must be 3 or longer"] 
    },
    cust: {type:String, 
            required: [true, "Customer Name is required, please enter"], 
            minlength: [3, "name must be 3 or longer"] 
    },
    stars: {type: Number,
            required: [true, "Number of stars are required, please enter"], 
    },
    
    _name: {type: Schema.Types.ObjectId, ref: 'Belt'}, 

    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
})
mongoose.model('Rel', RelSchema); // We are setting this Schema in our Models as 'Quote'
var Rel = mongoose.model('Rel'); // We are retrieving this Schema from our Models, named 'Quote'

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
    }).sort( { name: 1 } );
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

//call an belt by id and populate relations
app.get("/api/beltbyid/:id", (req, res) => { 
    console.log("in beltbyid in server.js");
    
    Belt.findOne({_id: req.params.id})
         .populate({path: 'reviews', options:{sort:{stars : -1}}})
        //  .populate('reviews')
         .exec(function(err, belt) { 
             if(err){
                 console.log("Returned error", err);
                     // respond with JSON
                 res.json({message: "Error", error: err})
             }
                 else {
                     console.log("server belt",);
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
                type: req.body.type
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
                    res.json({message: "Success", data: req.body });
                }
            });
            
        } else {

            res.json({message: 'Restaurant already exists: UnSuccessfully added', data: req.body });

        }

    });

}); 


//Belt edit by id (Belt)
app.put("/api/editbelt/:id", (req, res) => { 
    Belt.findOne({_id: req.params.id}, function(err, belt){
        console.log("In found a belt to edit ", req.params.id, req.body);
        
        belt.name = req.body.name,
        belt.type = req.body.type

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

app.post("/api/rel/:id", function(req, res) {
    console.log("in post rel Add");
    Belt.findOne({_id: req.params.id}, function(err, belt){
        console.log("req.body", req.body);
        var rel = new Rel({
            cust: req.body.cust,
            stars: req.body.stars,
            review: req.body.review,
            _name: belt._id
           
        });

        console.log("Rel: ", rel);
        // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
        rel.save(function(err) {
            belt.reviews.push(rel);
            belt.save(function(err) {
                // if there is an error console.log that something went wrong!
                console.log("err:", err) 
                if(err) {
                    console.log('unsuccessfully added!'); 
                    res.json({message: "Error", error: err})
                    
                } else { // else console.log that we did well and then redirect to the root route
                    console.log("just before json ")
                    res.json({message: 'Success', data: req.body });
                }
            });
        });
    });
});


// app.get("/api/qvoteup/:id", (req, res) => { 
//     console.log("in server gvoteup, req.params.id:", req.params.id)
//     Belt.findOne({_id: req.params.id}, function(err, belt){
//         //console.log("RBody: ", req.body, "Params: ", req.params);
//         console.log("in findone rtn, quote:", belt);
//         belt.totlikes++,
        
//         belt.save(function(err){
        
//             if(err){
//             console.log("Returned error", err);
//                 // respond with JSON
//             res.json({message: "Error", error: err})
//             } else {
//                 // respond with JSON
//             console.log("in findone rtn, quote:", belt);    
//             res.json({message: "Success", data: belt})
//             }
//         });
//     });
// });



//Catch all routes to allow for Angular routes
app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/index.html"))
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});
