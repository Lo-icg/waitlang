<?php
// Start output buffering
ob_start();
header("Content-Type: application/json");
ini_set('display_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "sir salen activity"; // Or a name without spaces

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    ob_end_clean();
    echo json_encode([
        "status"  => "error",
        "message" => "Connection failed: " . $conn->connect_error
    ]);
    exit;
}

// Assuming you have a table named "userB" (or "messages")
$query = "SELECT * FROM userB ORDER BY id ASC";
$result = $conn->query($query);
$messages = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }
    $response = [
        "status"   => "success",
        "messages" => $messages
    ];
} else {
    $response = [
        "status"  => "error",
        "message" => "Query error: " . $conn->error
    ];
}

$conn->close();
ob_end_clean();
echo json_encode($response);
exit;
?>
