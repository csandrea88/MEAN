var session = require('express-session');
var bcrypt = require('bcrypt-as-promised');
// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: 'codingdojorocks'})); 
// Require path
var path = require('path');
// Require Mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/LogRegDb');
var UserSchema = new mongoose.Schema({
   
    first: {
        type: String,
        minlength: [2, "First Name has to be 2 or longer"],
        required: [true, "First Name is required"]
    },
    
    last: {
        type: String,
        minlength: [2, "Last Name has to be 2 or longer"],
        required: [true, "Last Name is required"]
    },
   
    email: {
        type: String,
        required:  [true, "Email is required"]
        //validate: [isEmail, "Email should have a valid syntax e.g: example@example.com" ]
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "password has to be at least 8 long"],
        //maxlength: [32, "password has to be at most 32 long"]
        // validate: {
        //   validator: function( value ) {
        //     return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test( value );
        //   },
        //   message: "Password failed validation, you must have at least 1 number, uppercase and special character"
        // }
    },
    
    //cpassword: {type:String, required:true},
    birthday: {type: Date, required:[true, "Birthday is required"]},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});


mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'Quote'
var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'Quote'
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

app.get('/home', function(req, res) {
    res.render('home', {session: req.session});
});

app.post('/register', function(req, res) {
    let jserrors = null;

    console.log("before findone");

    User.findOne({email: req.body.email}, function(err, user) {
        
        
        if (user) {
            jserrors = 'Try to login; email already exists';
            console.log(jserrors);
        } else if(req.body.password != req.body.cpassword) {
            jserrors = 'Confirm Password does not match!';
            console.log(jserrors);
        }

        console.log("in findone rtn jserrors: ", jserrors);
    
        console.log("jserrors: ", jserrors);

        if (jserrors == null) {

            console.log("in /register route");
            console.log("POST DATA", req.body);

            bcrypt.hash(req.body.password, 10)
            .then(hashed_password => {
                req.body.password = hashed_password;
                    
                var user = new User({
                    first: req.body.first, 
                    last: req.body.last,
                    email: req.body.email,
                    password: req.body.password,
                    birthday: req.body.birthday
                });

                // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
                user.save(function(err) {
                // if there is an error console.log that something went wrong!
                
                    console.log("user:", user);

                    if(err) {
                        console.log('unsuccessfully added a user!'); 
                        res.render('index', {errors: user.errors})
                    } else { // else console.log that we did well and then redirect to the root route
                        console.log('successfully added a user!');

                        req.session.id = user._id;
                        req.session.first = user.first;
                        res.redirect('/home'); 
                    };
                });
            
            })
            .catch(error => {
                console.log("Hash problem in register; investigate");
            });


        } else {
            console.log("rendering index");
            res.render('index', {jserrors});
        };
    
    });    
    
   
    
});

app.post ('/login', function(req, res) {
    jserrors = null;

    User.findOne({email: req.body.logemail}, function(err, user) {
        
        if (!user) {
            console.log("email does not exist");
            jserrors = "This email does not exist";
            res.render('index', {jserrors});
        
        } else {
            console.log("starting the hashing of logpassword")                
            bcrypt.compare(req.body.logpassword, user.password)
            .then(ValidPassword=>{
                console.log("password matched");
                req.session.id = user._id;
                req.session.first = user.first;
                res.redirect('/home'); 
            })
            .catch(bcrypt.MISMATCH_ERROR, handleInvalidPassword=> {
                console.log("password mismatched");
                jserrors = "Invalid Password";  
                res.render('index', {jserrors}); 
            });   
        }
    });           
});

app.get ('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/'); 
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});
