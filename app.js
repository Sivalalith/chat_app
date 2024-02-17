const express = require("express");
const http = require('http');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const socketIo = require('socket.io');

const app = express();
// Create an HTTP server using Express
const server = http.createServer(app);

// Create a Socket.IO instance by passing the HTTP server
const io = socketIo(server);

app.set('view engine', 'ejs');
app.use(express.static("public", { index: 'login.html' }));
app.use(bodyParser.urlencoded({extended: true}));


app.post("/", function(req,res){
    const userName = req.body.userName;
    const userLocation = req.body.userLocation;
    // const socket = io({query: {userName}});
    res.render("home",{
        userName: userName,
        userLocation: userLocation
    })
})


// Event listener for Socket.IO connections
io.on('connection', (socket) => {
    const connectedUser = socket.handshake.query.userName;
    console.log(`User ${connectedUser} connected`);

    // Event listener for 'message' event
    socket.on('message', (data) => {
        console.log(`${connectedUser} sent: `, data);
        
        // Broadcast the received message to all connected clients
        io.emit('message', data);
    });

    // Event listener for 'disconnect' event
    socket.on('disconnect', () => {
        console.log(`User ${connectedUser} disconnected`);
    });
});

server.listen(3000, function(req,res){
    console.log("Server has started listening on port 3000.");
})