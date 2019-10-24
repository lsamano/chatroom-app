document.addEventListener('DOMContentLoaded', () => {

    var socket = io.connect('http://localhost:8080');
    
    // submit text message without reload/refresh the page
    const form = document.querySelector('form')
    form.addEventListener('submit', event => {
        event.preventDefault();
        socket.emit('chat_message', form.txt.value);
        form.reset()
        return false;
    })
    
    // append the chat text message
        socket.on('chat_message', function (msg) {
            const messagesDiv = document.getElementById('messages')
            const newLi = document.createElement('li')
            newLi.innerHTML = msg
        messagesDiv.append(newLi);
    });
    // append text if someone is online
        socket.on('is_online', function (username) {
            const messagesDiv = document.getElementById('messages')
            const newLi = document.createElement('li')
            newLi.innerHTML = username
            messagesDiv.append(newLi);
    });
    // ask username
    var username = prompt('Please tell me your name');
    socket.emit('username', username);

})    

