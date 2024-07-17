<?php
class Craft
{

    protected $con;
    public static function instance() {
        static $instance = null;
        if ($instance === null)
            $instance = new Craft();
        return $instance;
    }

    private function __construct() {
        $this->con = new mysqli("wheatley.cs.up.ac.za", "u23684365", "WZRJBWGIQ7LVZYJTWTBHWAI7EB5ZNWRP", "u23684365_CraftLink");
        if ($this->con->connect_error) {
            die("Connection failed: " . $this->con->connect_error);
        } else {
            $this->con = $this->con;
            echo "Connected!";
        }

        return $this->con;
    }

    public function __destruct() {
        mysqli_close($this->con);
    }

    public function handleRequest() {

        if ($_SERVER["REQUEST_METHOD"] === "POST") {

            $reqbody = json_decode(file_get_contents('php://input'), true);

            $type = $reqbody["type"];

            if (!isset($type)) {
                echo json_encode(new Response("Error", time(), "No type specified"));
                exit();
            }

            
            if ($type === "getUser") {
                $this->getUser($reqbody);
            } else if ($type === "updateUser") {
                $this->updateUser($reqbody);
            } else if ($type === "updatePassword") {
                $this->updatePassword($reqbody);
            } else if ($type === "deleteUser") {
                $this->deleteUser($reqbody);
            } else if ($type === "getReview") {
                $this->getReview($reqbody);
            } else if ($type === "setReview") {
                $this->setReview($reqbody);
            } else if ($type === "logout") { 
                $this->logout();
            }
            else if ($type === "login") {
                $this->login($reqbody);
            } 
            else if ($type === "history") { 
                $this->history();
            } else if ($type === "signUp") {
                $this->signUp($reqbody);
            }
        
        }
    }
    public function getUser($reqbody)
    {
        $craft = Craft::instance();
        session_start();
        // $email= $_SESSION["email"];
        // $user_id= $_SESSION["user_id"];
        $user_id="2";
        /////////
        $sql = "SELECT * FROM User WHERE User_ID= $user_id";
        $result = $this->con->query($sql);
        if ($result && $result->num_rows > 0)
        {
            $user=$result->fetch_assoc();
            echo json_encode(new Response("success", time(), $user));
        }
        else
        {
            echo json_encode(new Response("failure", time(), "user not found"));
        }
        
    }
    public function deleteUser($jsonData)
    {
        
        $sql = "DELETE FROM User WHERE User_ID = ?";
        $user_id= "5";
        $stmt = $this->con->prepare($sql);
        if (!$stmt) {
            echo "Error: " . $this->con->error;
            return;
        }
        //????????????????????????????????????????
        // $stmt->bind_param("i", $_SESSION["user_id"]);
        $stmt->bind_param("i", $user_id);
        $stmt->execute();

        echo json_encode(new Response("success", time(), "user deleted from database"));

        if (isset($_SESSION["user_id"]))
            session_destroy();
    }
    public function logout()
    {
        session_start();
        if (isset($_SESSION["user_id"]))
            session_destroy();
    }
    public function setReview($reqbody)
    {
        $craft = Craft::instance();
        //$reqbody = json_decode(file_get_contents('php://input'), true);
        session_start();
        // $email = $reqbody["email"];
        //$email= $_SESSION["email"];
        // $user_id = $hoop->getUserIdByEmail($email);
        $user_id="5";
        //$user_id= $_SESSION["user_id"];
        ///////////////////////////////////

        if (!$user_id) {
            echo "Error: User not found";
            return;
        }

        $service_id = $reqbody["service_id"];
        $rating = $reqbody["rating"];
        $review = $reqbody["review"] ?? null;
        $date_time = date('Y-m-d');

        $stmt = $craft->con->prepare("INSERT INTO Review (User_ID, Service_ID, Review_Date, Review_Content, Star_Rating) VALUES (?, ?, ?, ?,?)");
        $stmt->bind_param("issss",$user_id, $service_id, $date_time, $review,$rating);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            echo json_encode(new Response("success", time(), "Review added successfully"));
        } else {
            echo json_encode(new Response("failure", time(), "Review not added "));
        }

        
    }
    public function getReview($reqbody)
    {
        $service_id = $reqbody["service_id"];
        //$sqlcheckpref = "SELECT * FROM Review INNER JOIN Service_Profile ON Review.Service_ID=Service_Profile.Service_ID INNER JOIN User ON Review.User_ID=User.User_ID WHERE Review.Service_ID=Service_Profile.Service_ID'";
        $sqlcheckpref= "SELECT *FROM Review INNER JOIN Service_Profile ON Review.Service_ID = Service_Profile.Service_ID INNER JOIN User ON Review.User_ID = User.User_ID WHERE Review.Service_ID = Service_Profile.Service_ID AND Service_Profile.Service_ID= $service_id";

        $result = $this->con->query($sqlcheckpref);
        $reviews = array();
        
        if ($result && $result->num_rows > 0) {
            while ($pref = $result->fetch_assoc()) {
                $user_rev = array(
                    "date" => $pref["Review_Date"],
                    "review" => $pref["Review_Content"],
                    "rating" => $pref["Star_Rating"],
                    "user_id" => $pref["User_ID"],
                    // "image" => $pref["image"],
                    "service" => $pref["Service_title"],
                    "name" => $pref["First_Name"]
                );
                $reviews[] = $user_rev;
            }
            echo json_encode(new Response("success", time(), $reviews));
        } else {
            $sql="SELECT Service_title FROM Service_Profile WHERE Service_Profile.Service_ID='$service_id' ";
            $res=$this->con->query($sql);
            while ($pref = $res->fetch_assoc()) {
                $user_rev = array(
                    // "image" => $pref["image"],
                    "title" => $pref["Service_title"]
                );
                $reviews[] = $user_rev;
            }
            echo json_encode(new Response("failure", time(), $reviews));
        }
        
    }
    public function updateUser($jsonData)
    {
        //get all json data
        //get phone from data
        session_start();
        // $email = $reqbody["email"];
        //$email= $_SESSION["email"];
        $user_id="5";
        $phone = $jsonData["phone"];
        //get email from data
        $email = $jsonData["email"];
        
        $sn = $jsonData["street_name"];
        
        $s_no = $jsonData["street_no"];
        
        $suburb = $jsonData["suburb"];

        $city= $jsonData["city"];
        $pr= $jsonData["province"];
        $pc = $jsonData["postal_code"];

        //check if phone number is all numbers and smaller than 16 digits
        if (strlen($phone) > 10 || !preg_match('/^\d+$/', $phone)) {
            echo json_encode(new Response("error", time(), "phone number is not all digits"));
            exit();
        }

        //check if email is valid
        $pattern = '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/';
        if (!preg_match($pattern, $email)) {
            echo json_encode(new Response("error", time(), "invalid email address"));
            exit();
        }

        //check if email is unique
        $sql = "SELECT User_ID, COUNT(*) FROM User WHERE email = ?";
        $stmt = $this->con->prepare($sql);
        if (!$stmt) {
            echo "Error: " . $this->con->error;
            return;
        }
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $count = $result->fetch_assoc()['COUNT(*)'];
        $id = $result->fetch_assoc();
        if ($count > 0) {
            //session_start();
            if ($id != $user_id) {
                echo json_encode(new Response("error", time(), "email already in use"));
                exit();
            }
        }


        
        $sqlUser = "UPDATE User SET Phone_no=?, Email=? WHERE User_ID=?";
        $stmt = $this->con->prepare($sqlUser);
        if (!$stmt) {
            echo "Error: " . $this->con->error;
            return;
        }
        // session_start();
        $stmt->bind_param("ssi", $phone, $email, $user_id);
        $stmt->execute();

        $sqlAdd = "UPDATE User_Address SET Street_no=?, Street_name=?, Suburb=?, City=?, Postal_code =?, Province= ? WHERE User_ID=?";
        $stmt = $this->con->prepare($sqlAdd);
        if (!$stmt) {
            echo "Error: " . $this->con->error;
            return;
        }
        $stmt->bind_param("isssisi", $s_no, $sn,$suburb,$city,$pc,$pr, $user_id);
        $stmt->execute();

       
        echo json_encode(new Response("success", time(), "user details updated"));
    }
    public function updatePassword($jsonData)
    {
        //get all json data
        //get phone from data
       // session_start();
        $user_id="5";
        $oldPassword = $jsonData["oldPassword"];
        //$oldPassword = "SELECT User_password From User Where User_ID=$user_id";

        $hashedOldPassword = hash('sha256', $oldPassword);
        //get email from data
        $newPassword = $jsonData["newPassword"];

        //check if oldPassword is in the database and belonds to the current user
        $sqlOldPassword = "SELECT User_password FROM User WHERE User_ID = ?";
        $stmt = $this->con->prepare($sqlOldPassword);
        if (!$stmt) {
            echo "Error: " . $this->con->error;
            return;
        }
        session_start();
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $password = $result->fetch_assoc()['User_password'];
        //fix if!!!!!!!!!!!!!!!!!!!!!!!////////
        // if ($hashedOldPassword != $password)
        if ($hashedOldPassword != $password) {
            echo json_encode(new Response("error", time(), "old password is incorrect"));
            return;
        }

        //check if new password is valid
        if (!preg_match("/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+{};:,<.>]).{8,}$/", $newPassword)) {
            echo json_encode(new Response("error", time(), "new password is invalid"));
            exit();
        }
        $hashedNewPassword = hash('sha256', $newPassword);

        //update password in database
        $sql = "UPDATE User SET User_password=? WHERE User_ID=?";
        $stmt = $this->con->prepare($sql);
        if (!$stmt) {
            echo "Error: " . $this->con->error;
            return;
        }
        session_start();
        $stmt->bind_param("si", $hashedNewPassword, $user_id);
        $stmt->execute();

        echo json_encode(new Response("success", time(), "user password updated"));
    }
    public function history()
    {
        $craft = Craft::instance();
        session_start();
        // $user_id= $_SESSION["user_id"];
        $user_id="5";
        $sql = "SELECT Billing_Date, Service_title FROM Billing Inner Join Service_Profile ON Billing.Service_ID=Service_Profile.Service_ID WHERE Billing.User_ID=$user_id" ;
        $result = $this->con->query($sql);
        if ($result && $result->num_rows > 0)
        {
            $user=$result->fetch_assoc();
            echo json_encode(new Response("success", time(), $user));
        }
        else
        {
            echo json_encode(new Response("failure", time(), "user not found"));
        }  
    }
    public function login($request_body)
    {

        $email = $request_body["email"];
        $password = $request_body["password"];
        //isset as params
        if ($email == "" && $password == "") {

            $data = [
                "message" => "Email and Password are empty",
            ];
            echo json_encode(new Response("Error", time(), $data));
            return;
        }
        //check if email exits in db
        $loginQuery = "SELECT User_ID FROM User
        WHERE Email = ?";

        if (!$statement = $this->con->prepare($loginQuery)) {
            die('Prepare failed');
        }

        $statement->bind_param('s', $email);
        $statement->execute();

        $statement->bind_result($user_id);

        // Fetch the result
        if ($statement->fetch()) {
            $user = $statement->fetch();
        } else {          
            $data = [
                "message" => "No user found with the given email",
            ];
           
            header("Content-Type: application/json");
            echo json_encode(new Response("Error", time(), $data));
            return;
        }

        $statement->close();

        if ($user === false) {
            $data = [
                "message" => "User not found",
            ];
            header("Content-Type: application/json");
            echo json_encode(new Response("Error", time(), $data));
            return;
        } else {
            //hash passed in password
            $hashpass = hash('sha256', $password);
            //verify the password if email exsists

            $loginQuery = "SELECT User_password FROM User WHERE User_password = ?";

            if (!$statement = $this->con->prepare($loginQuery)) {
                die('Prepair failed');
            }

            $statement->bind_param('s', $hashpass);
            $statement->execute();

            $statement->bind_result($password);

            if ($statement->fetch()) {
                $statement->close();

                $data = [
                    "message" => "User logged in",
                    "user_id" => $user_id

                ];

                //if password && email update status to true and start session
                // $update = "UPDATE User SET active = ? WHERE user_id = ?";
                // $stmt = $this->con->prepare($update);
                // if (!$stmt) {
                //     echo $this->con->error;
                // }
                // $act = 1;
                // $userID = $user_id;

                // $stmt->bind_param('ii', $act, $userID);
                // $stmt->execute();
                // $stmt->close();


                //start session
                session_start();
                $_SESSION["user_id"] = $user_id;
                $_SESSION["email"] = $email;

                header("Content-Type: application/json");
                echo json_encode(new Response("Success", time(), $data));
                return;
            } else {
                // Password is incorrect
                $data = [
                    "message" => "Invalid credentials",

                ];
                header("Content-Type: application/json");
                echo json_encode(new Response("Error", time(), $data));
                return;
            }
        }
    }
    public function signUp($jsonData)
    {
        //get all json data
        //get name and surname 
        $id= $jsonData["id"];
        $fname = $jsonData["fname"];
        $surname = $jsonData["surname"];
        //get dob from data
        $dob = $jsonData["dob"];
        //get gender from data
        // $gender = $jsonData["gender"];
        //get phone from data
        $phone = $jsonData["phone"];
        //get email from data
        $email = $jsonData["email"];
        //get password from data
        $password = $jsonData["password"];
        //get country_id from data
        $sn = $jsonData["street_name"];
        
        $s_no = $jsonData["street_no"];
        
        $suburb = $jsonData["suburb"];

        $city= $jsonData["city"];
        $pr= $jsonData["province"];
        $pc = $jsonData["postal_code"];

        //check if name and surname are valid
        if (empty($fname) || empty($surname)) {
            //some error response
            echo json_encode(new Response("error", time(), "empty name or surname"));
            exit();
        }
        if (empty($id)|| !$this->isValid($id)) {
            //some error response
            echo json_encode(new Response("error", time(), "invalid ID"));
            exit();
        }
        $id=trim($id);
        $fname = trim($fname);
        $surname = trim($surname);
        $fname = stripslashes($fname);
        $surname = stripslashes($surname);
        $fname = htmlspecialchars($fname);
        $surname = htmlspecialchars($surname);
        if (strlen($fname) > 100 || !preg_match("/^[a-zA-ZÀ-ÿ-' ]*$/u", $fname)) {
            //some error response for invald name
            echo json_encode(new Response("error", time(), "invalid name"));
            exit();
        }
        if (strlen($surname) > 100 || !preg_match("/^[a-zA-ZÀ-ÿ-' ]*$/u", $surname)) {
            //some error response for invald surname
            echo json_encode(new Response("error", time(), "invalid surname"));
            exit();
        }
        ucwords($fname);
        ucwords($surname);

        //check if dob is greater than 1900 and smaller than  current date 
        $dobDateTime = DateTime::createFromFormat('Y-m-d', $dob);
        $minDate = DateTime::createFromFormat('Y', '1900');
        $currentDate = new DateTime();

        if (!$dobDateTime || $dobDateTime->format('Y-m-d') !== $dob || $dobDateTime <= $minDate || $dobDateTime >= $currentDate) {
            // some error message for invalid dob
            echo json_encode(new Response("error", time(), "Invalid date of birth"));
            exit();
        }


        //check if phone number is all numbers and smaller than 16 digits
        if (strlen($phone) > 10 || !preg_match('/^\d+$/', $phone)) {
            echo json_encode(new Response("error", time(), "phone number invalid"));
            exit();
        }

        //check if email is valid
        $pattern = '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/';
        if (!preg_match($pattern, $email)) {
            echo json_encode(new Response("error", time(), "invalid email address"));
            exit();
        }

        //check if email is unique
        $sql = "SELECT COUNT(*) FROM User WHERE Email = ?";
        $stmt = $this->con->prepare($sql);
        if (!$stmt) {
            echo "Error: " . $this->con->error;
            return;
        }
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $count = $result->fetch_assoc()['COUNT(*)'];
        if ($count > 0) {
            echo json_encode(new Response("error", time(), "email already in use "));
            exit();
        }

        //check if password is valid
        if (!preg_match("/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+{};:,<.>]).{8,}$/", $password)) {
            echo json_encode(new Response("error", time(), "invalid password"));
            exit();
        }
        $hashedPassword = hash('sha256', $password);

        //insertUser
        $sqlUser = "INSERT INTO User (ID_no, First_Name, Last_Name, Date_of_Birth,Phone_no, Email, User_password) VALUES (?,?,?,?,?,?,?)";
        $stmt = $this->con->prepare($sqlUser);
        if (!$stmt) {
            echo "Error: " . $this->con->error;
            return;
        }
        $stmt->bind_param("sssssss",$id, $fname, $surname, $dob,$phone, $email, $hashedPassword);
        $stmt->execute();

        $sqlGetID = "SELECT User_ID FROM User WHERE Email = ?";
        $stmt = $this->con->prepare($sqlGetID);
        if (!$stmt) {
            echo "Error: " . $this->con->error;
            return;
        }
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 1) {
            $user_id = $result->fetch_assoc()['User_ID'];
        } else {
            echo json_encode(new Response("error", time(), "user_id not found"));
        }

        $sqlAdd = "INSERT INTO User_Address (Street_no, Street_name, Suburb, City, Postal_code, Province,User_ID) VALUES (?, ?, ?, ?, ?,?,?)";

        $stmt = $this->con->prepare($sqlAdd);
        if (!$stmt) {
            echo "Error: " . $this->con->error;
            return;
        }
        $stmt->bind_param("isssisi", $s_no, $sn,$suburb,$city,$pc,$pr,$user_id);
        $stmt->execute();

        // $data = [ "fname" => $fname, "surname" => $surname, "dob" => $dob, "gender" => $gender, "phone" => $phone, "email" => $email, "password" => $hashedPassword, "country_id" => $country_id, "card_no" => $card_no];  
        echo json_encode(new Response("success", time(), "user added to database"));
        session_start();
        $_SESSION["user_id"] = $user_id;
        
    }
    public function isValid($idNumber) {
        // Remove any non-digit characters
        $cleanId = preg_replace("/[^0-9]/", "", $idNumber);
    
        // Check if the ID number is 13 digits long
        if (strlen($cleanId) !== 13) {
            return false;
        }
    
        // Calculate the checksum digit
        $checksumDigit = 0;
        for ($i = 0; $i < 12; $i++) {
            $digit = substr($cleanId, $i, 1);
            $factor = pow((12 - $i), 2);
            $checksumDigit += $digit * $factor;
        }
        $checksumDigit %= 11;
    
        // Determine the last digit of the ID number
        $lastDigit = substr($cleanId, 12, 1);
    
        // Check if the calculated checksum matches the last digit
        return $checksumDigit == $lastDigit;
    }

}
$craft = Craft::instance();
$craft->handleRequest();
class Response
{

    public $status;
    public $timestamp;
    public $data;


    function __construct($status, $timestamp, $data)
    {
        $this->status = $status;
        $this->timestamp = $timestamp;
        $this->data = $data;
    }
}

?>
