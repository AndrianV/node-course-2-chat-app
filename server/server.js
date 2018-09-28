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

    // socket.emit('newEmail', {
    //     from: 'mike@example.com',
    //     text: 'Hey. What is going on.',
    //     createdAt: 123
    // });

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app',
        createdAt: new Date().getTime()
    });

    //socket.broadcast.emit from Admin text New User joined
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    });

    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail', newEmail);
    // });

    socket.on('createMessage', (message) => {
        console.log('Create message : ', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });


    socket.on('disconnect', () => {
        clients.pop(socket.id);
        var clientDisconnectedMsg = `User disconnected! , total: [ ${clients.length} ]`
        console.log(clientDisconnectedMsg);
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});