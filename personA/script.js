 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBELvs-Ek4ZT5mKSfUG5WvOrKcxQBdRkpM",
    authDomain: "chatchatnalang.firebaseapp.com",
    databaseURL: "https://chatchatnalang-default-rtdb.firebaseio.com",
    projectId: "chatchatnalang",
    storageBucket: "chatchatnalang.firebasestorage.app",
    messagingSenderId: "312760718594",
    appId: "1:312760718594:web:3c5f4348e6a18d6c951e1b",
    measurementId: "G-0161NT3JZ0"
  };

  // Initialize Firebase using the Firebase namespace
firebase.initializeApp(firebaseConfig);
  //const analytics = getAnalytics(app);

// Get a reference to the Realtime Database service
const db = firebase.database();

// Function to send a new message along with the sender
// Function to send a new message along with the sender to Firebase
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    if (message === "") return;
    
    // Create a message object including sender and a timestamp
    const msgData = {
        sender: user,
        message: message,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    };

    // Push the new message to the "messages" node in Firebase
    db.ref('messages').push(msgData, error => {
        if (error) {
            console.error("Error sending message:", error);
        } else {
            messageInput.value = "";
        }
    });
}

// Function to load and display messages from the server
// Function to load and display messages from Firebase in real time
function loadMessages() {
    // Attach a listener to the "messages" node, ordered by timestamp
    db.ref('messages').orderByChild('timestamp').on('value', snapshot => {
        const chatBox = document.getElementById('chatBox');
        chatBox.innerHTML = ""; // Clear current messages
        snapshot.forEach(childSnapshot => {
            const msg = childSnapshot.val();
            const p = document.createElement('p');
            p.classList.add('message'); // Base style for messages

            // Add "sent" or "received" class based on the sender
            if (msg.sender === user) {
                p.classList.add('sent');
            } else {
                p.classList.add('received');
            }
            // Display only the message text (customize as needed)
            p.textContent = msg.message;
            chatBox.appendChild(p);
        });
    });
}

// Load messages immediately when the page loads
window.onload = function() {
    loadMessages();
};
