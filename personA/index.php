<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  <title>User A Chat</title>
</head>
<body>

<div class="header"><p>User A</p></div>

  <div class="chat-container">
    <div class="chat-box" id="chatBox"></div>
    <div class="input-container">
      <input type="text" id="messageInput" placeholder="Send a message to User B...">
      <button onclick="sendMessage()">Send</button>
    </div>
  </div>
  
  <!-- Define the sender for this site -->
  <script> const user = "UserA"; </script>

  <!-- Firebase SDKs -->
  <script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-database-compat.js"></script>

  <script src="script.js"></script>
</body>
</html>
