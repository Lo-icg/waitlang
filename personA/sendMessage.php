<?php
ob_start();
header("Content-Type: application/json");
ini_set('display_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "sir salen activity";  // Replace with your common database name

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    ob_end_clean();
    echo json_encode([
        "status"  => "error",
        "message" => "Connection failed: " . $conn->connect_error
    ]);
    exit;
}

if (!isset($_POST['message']) || trim($_POST['message']) === "" || !isset($_POST['sender'])) {
    ob_end_clean();
    echo json_encode([
        "status"  => "error",
        "message" => "Message or sender not provided"
    ]);
    exit;
}

$message = $_POST['message'];
$sender = $_POST['sender'];

$stmt = $conn->prepare("INSERT INTO chat_messages (sender, message) VALUES (?, ?)");
if (!$stmt) {
    ob_end_clean();
    echo json_encode([
        "status"  => "error",
        "message" => "Prepare failed: " . $conn->error
    ]);
    exit;
}
$stmt->bind_param("ss", $sender, $message);

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
ob_end_clean();
echo json_encode($response);
exit;
?>
