const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var clients = [];

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    clients.push(socket.id);
    var clientConnectedMsg = `New user connected! , total: [ ${clients.length} ]`;
    console.log(clientConnectedMsg);
    socket.on('disconnect', () => {
        clients.pop(socket.id);
        var clientDisconnectedMsg = `User disconnected! , total: [ ${clients.length} ]`
        console.log(clientDisconnectedMsg);
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});