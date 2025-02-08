function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (message === "") return;

    fetch('sendMessage.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "message=" + encodeURIComponent(message)
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


function loadMessages() {
    fetch('getMessage.php')
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            const chatBox = document.getElementById('chatBox');
            chatBox.innerHTML = ""; // Clear current messages
            data.messages.forEach(msg => {
                // Create a new paragraph for each message
                const p = document.createElement('p');
                p.textContent = msg.message; // or include other fields like msg.created_at if desired
                chatBox.appendChild(p);
            });
        } else {
            console.error("Error loading messages:", data.message);
        }
    })
    .catch(error => console.error("Fetch error:", error));
}
