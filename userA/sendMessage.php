<?php
// Start output buffering to prevent any accidental output
ob_start();

// Set the Content-Type header to JSON
header("Content-Type: application/json");

// (Optional) Enable error reporting for debugging; disable in production
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Database connection details
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "sir salen activity"; // Consider renaming to "sir_salen_activity" to avoid issues with spaces

// Create the connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection; if it fails, output only JSON and exit
if ($conn->connect_error) {
    ob_end_clean();
    echo json_encode([
        "status"  => "error",
        "message" => "Connection failed: " . $conn->connect_error
    ]);
    exit;
}

// Make sure a message was sent via POST and is not empty
if (!isset($_POST['message']) || trim($_POST['message']) === "") {
    ob_end_clean();
    echo json_encode([
        "status"  => "error",
        "message" => "No message provided"
    ]);
    exit;
}

$message = $_POST['message'];

// Prepare a statement to insert the message
$stmt = $conn->prepare("INSERT INTO userB (message) VALUES (?)");
if (!$stmt) {
    ob_end_clean();
    echo json_encode([
        "status"  => "error",
        "message" => "Prepare failed: " . $conn->error
    ]);
    exit;
}
$stmt->bind_param("s", $message);

if ($stmt->execute()) {
    $response = [
        "status"  => "success",
        "message" => "Message saved"
    ];
} else {
    $response = [
        "status"  => "error",
        "message" => "Error: " . $stmt->error
    ];
}

$stmt->close();
$conn->close();

// Clear any buffered output and output the JSON response
ob_end_clean();
echo json_encode($response);
exit;
?>
