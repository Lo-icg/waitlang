// Function to send a new message along with the sender
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    if (message === "") return;

    fetch('sendMessage.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        // Send both the message and the sender (user is defined in your HTML)
        body: "message=" + encodeURIComponent(message) + "&sender=" + encodeURIComponent(user)
    })
    .then(response => response.text())
    .then(text => {
        console.log("Raw response:", text);
        try {
            const data = JSON.parse(text);
            console.log("Parsed JSON:", data);
            if (data.status === "success") {
                messageInput.value = "";
                // After successfully saving the message, refresh the chat display
                loadMessages();
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("JSON parse error:", error);
        }
    })
    .catch(error => console.error("Fetch error:", error));
}

// Function to load and display messages from the server
function loadMessages() {
    fetch('getMessages.php')
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            const chatBox = document.getElementById('chatBox');
            chatBox.innerHTML = ""; // Clear current messages
            data.messages.forEach(msg => {
                const p = document.createElement('p');
                p.classList.add('message'); // Base style for all messages

                // Add "sent" if message is from current user; otherwise add "received"
                if (msg.sender === user) {
                    p.classList.add('sent');
                } else {
                    p.classList.add('received');
                }
                p.textContent = msg.message;
                chatBox.appendChild(p);
            });
        } else {
            console.error("Error loading messages:", data.message);
        }
    })
    .catch(error => console.error("Fetch error:", error));
}

// Load messages when the page loads and refresh every 3 seconds
window.onload = function() {
    loadMessages();
    setInterval(loadMessages, 3000);
};
