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

        $sql = "";

        if(isset($data['type']) && $data['type'] == "getProfiles"){
            $sql = "SELECT USER.First_Name, Last_Name, Profile_pic, SERVICE_PROFILE.
            FROM USER 
            JOIN SERVICE_PROFILE 
            ON USER.user_id = SERVICE_PROFILE.user_id";
            $stmt = $craftlink->con->prepare($sql);
        }
        else if(isset($data['type']) && $data['type'] == "getInfo")
        {
            $sql = "SELECT USER.*, SERVICE_PROFILE.* 
            FROM USER 
            JOIN SERVICE_PROFILE 
            ON USER.user_id = SERVICE_PROFILE.user_id";
            $stmt = $craftlink->con->prepare($sql);
        }
        else if(isset($data['type']) && $data['type'] == "searchBar" && isset($data['search'])){

            $param = $data['search'];
            $sql = "SELECT First_Name, Last_Name, Profile_Pic, Service_Description FROM USER where user_id IN (SELECT user_id,Service_Description FROM SERVICE_PROFILE WHERE Service_title like %?%)";
            $stmt->bind_param("s", $param);
            $stmt = $craftlink->con->prepare($sql);

        }

        if($stmt->execute()){

            $result = $stmt->get_result();
            $profiles = array();

            while ($row = $result->fetch_assoc()) {
                $profiles[] = $row;
            }

            $status = "success";
                $timestamp = time(); 
                $data = $profiles;
        }
        else
        {
            $status = "error";
            $timestamp = time(); 
            $data = 'No profiles found';
        }

        $returnObject = array(
            "status" => $status,
            "timestamp" => $timestamp,
            "data" => $data
            );

        echo(json_encode($returnObject));
    }


?>


