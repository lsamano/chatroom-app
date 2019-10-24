document.addEventListener('DOMContentLoaded', () => {

    var socket = io.connect('http://localhost:8080');
    
    // Makes form send messages
    const form = document.querySelector('form')
    form.addEventListener('submit', event => {
        event.preventDefault();
        socket.emit('chat_message', form.txt.value);
        form.reset()
    })

    const appendNewMessage = message => {
        const messagesDiv = document.getElementById('messages')
        const newLi = document.createElement('li')
        newLi.innerHTML = message
        messagesDiv.append(newLi);
    }
    
    // appends received messages
    socket.on('chat_message', appendNewMessage);

    // append text if someone is online
    socket.on('is_online', appendNewMessage);

    // ask username
    var username = prompt('Please tell me your name');
    socket.emit('username', username);

})    

