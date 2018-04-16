// Import express and path modules.copy
var express = require( "express");
var path = require( "path");

// Create the express app.
var app = express();
// Define the static folder.
app.use(express.static(path.join(__dirname, "./static")));
// Setup ejs templating and define the views folder.
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
    res.render("index", {title: "Survey"});
});
// Start Node server listening on port 8000.
var server = app.listen(8000, function() {
    console.log("listening on port 8000");
});
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);
    
    socket.on( "in_form", function (data){
        
        console.log('data', data);
        
        var resp_data = {
            fname: data.Ofname,
            lname: data.Olname,
            age: data.Oage,
            email: data.Oemail
        }
        
        Num = Math.floor(Math.random() * 1001);
        
        socket.emit('server_response', {response: resp_data, lucky_num: Num});
    });

});  



