const socket = io({query: {userName}});

socket.on('connection', () => {
    console.log(`User ${userName} Connected`);
});

document.getElementById("userMessageSendBtn").addEventListener("click", function(){
    console.log("Button clicked!");
    const userMessage = document.getElementById("userMessage").value;
    socket.emit('message', userMessage); // Emit 'message' event with the message
    document.getElementById("userMessage").value = ''; // Clear the input field
})

// Event listener for 'message' event
socket.on('message', (data) => {
    console.log("Message Received!");
    const messageList = document.getElementById('messageList');
    const listItem = document.createElement('li');
    listItem.textContent = data;
    messageList.appendChild(listItem);
});