var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

    // socket.emit('createEmail', {
    //     to: 'jen@example.com',
    //     text: 'Hey. This is Andrian.'
    // });

    // socket.emit('createMessage', {
    //     from: 'Andrian',
    //     text: 'Hey, I am sending you this from the browser.'
    // });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

// socket.on('newEmail', function(email) {
//     console.log('New email', email);
// });

socket.on('newMessage', function(message) {
    console.log('Got new message: ', message);
});