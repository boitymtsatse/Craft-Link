<?php
    // session_start();
    // header("Content-Type: application/json");
    // header("Content-Type: application/x-www-form-urlencoded");

    class CraftLink{
    
        public static function instance() {
            static $instance = null; 
            if($instance === null)
                $instance = new CraftLink();
            return $instance; 
        }

        private function __construct() {
            $con = new mysqli("localhost","root","Naturalscience1","CraftLink");
            if ($con->connect_error) {
                echo "Failed";
                die("Connection failed: ".$con->connect_error);
            }
            else
            {
                echo "Connected!";
            }
            $this->con = $con;
        }
        public function __destruct() { 
            mysqli_close($this->con);
        }
    }

    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body,true);
    $craftlink = CraftLink::instance();

    if($_SERVER["REQUEST_METHOD"] == "POST"){

        if(isset($data['type']) && $data['type'] == "getProfiles" && !isset($data['password']) && !isset($data['email']) && !isset($data['surname'])){
            $sql = "SELECT First_Name, Last_Name, Profile_Pic FROM USER where user_id IN SELECT user_id FROM SERVICE_PROFILE";
            $stmt = $this->con->prepare($sql);
            if($stmt->execute()){

                $result = $stmt->get_result();
                $profiles = array();

                while ($row = $result->fetch_assoc()) {
                    $profiles[] = $row;
                }

                if(count($listings) > 0) {
                }
            }
        }

    }


?>