const express = require('express');
const logger = require('morgan');

const app = express();

// For logging
app.use(logger('dev'));

// socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Allows for serving static files
app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + 'index.html');
});

io.sockets.on('connection', function (socket) {
    socket.on('username', function (username) {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('disconnect', function (username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })

    socket.on('chat_message', function (message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});

const server = http.listen(8080, function () {
    console.log('listening on *:8080');
});
