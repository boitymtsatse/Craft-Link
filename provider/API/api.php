<?php
header("Content-Type: application/json");

// Database conn
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "DBtables";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(array("message" => "Connection failed: " . $conn->connect_error));
    exit();
}

// Helper func for SQL queries
function executeQuery($conn, $query) {
    $result = $conn->query($query);
    if ($result === TRUE) {
        return json_encode(array("message" => "Success"));
    } elseif ($result) {
        return json_encode($result->fetch_all(MYSQLI_ASSOC));
    } else {
        http_response_code(400);
        return json_encode(array("message" => "Error: " . $conn->error));
    }
}

// Routing
$method = $_SERVER['REQUEST_METHOD'];
$path = explode('/', trim($_SERVER['PATH_INFO'],'/'));

switch ($method) {
    case 'GET':
        if ($path[0] == 'users') {
            $query = "SELECT * FROM User";
            echo executeQuery($conn, $query);
        } else if ($path[0] == 'services') {
            $query = "SELECT * FROM Service_Profile";
            echo executeQuery($conn, $query);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Resource not found."));
        }
        break;

    case 'POST':
        if ($path[0] == 'users') {
            $data = json_decode(file_get_contents('php://input'), true);
            if (is_null($data)) {
                http_response_code(400);
                echo json_encode(array("message" => "Invalid input"));
                exit();
            }
            $query = "INSERT INTO User (First_Name, Last_Name, Date_of_Birth, ID_no, User_password, Phone_no, Email, Profile_Pic) VALUES ('".$data['First_Name']."', '".$data['Last_Name']."', '".$data['Date_of_Birth']."', '".$data['ID_no']."', '".$data['User_password']."', '".$data['Phone_no']."', '".$data['Email']."', NULL)";
            echo executeQuery($conn, $query);
        } else if ($path[0] == 'services') {
            $data = json_decode(file_get_contents('php://input'), true);
            if (is_null($data)) {
                http_response_code(400);
                echo json_encode(array("message" => "Invalid input"));
                exit();
            }
            $query = "INSERT INTO Service_Profile (Service_title, Rating, Service_Description, User_ID) VALUES ('".$data['Service_title']."', '".$data['Rating']."', '".$data['Service_Description']."', '".$data['User_ID']."')";
            echo executeQuery($conn, $query);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Resource not found."));
        }
        break;

    case 'PUT':
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed."));
        break;

    case 'DELETE':
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed."));
        break;

    default:
        http_response_code(405);
        echo json_encode(array("message" => "Unsupported HTTP method."));
        break;
}

$conn->close();
?>
