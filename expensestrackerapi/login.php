<?php
require 'connection.php';

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);

if (isset($postdata) && !empty($postdata)) {
    $email = mysqli_real_escape_string($con, trim($request->email));
    $password = mysqli_real_escape_string($con, trim($request->password));
    $hashed_password = hash('sha256', $password);



    $sql =   "SELECT * FROM users WHERE email ='$email' AND password ='$hashed_password'";


    if ($result = mysqli_query($con, $sql)) {
        $rows = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }
        echo json_encode($rows);
    } else {

        http_response_code(404);
    }
}
