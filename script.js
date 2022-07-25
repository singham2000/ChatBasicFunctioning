const socket = io('https://demo-chatty-socketio.herokuapp.com/');

const messageForm = document.getElementById('send-container');
const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');
const name = prompt('Your Name');
appendMessage('You Joined');
socket.emit('new-user', name);

socket.on('chat-message', data => {
    appendMessage(`${data.name} : ${data.message}`);
})
socket.on('user-connected', name => {
    appendMessage(`${name} Connected`);
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} Disconnected`);
})

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message);
    messageInput.value = ' ';
});

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}