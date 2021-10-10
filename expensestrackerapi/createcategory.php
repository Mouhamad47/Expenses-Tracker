<?php
require 'connection.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    // Extract the data.
    $request = json_decode($postdata);


    // Validate.
    if (trim($request->name) == ''|| $request->user_id == null ) {
        return http_response_code(400);
    }

    // Sanitize.
    $name  = mysqli_real_escape_string($con, trim($request->name));
    $user_id  = mysqli_real_escape_string($con, trim($request->user_id));


    // Create.
    $sql = "INSERT INTO categories VALUES (null,'$name',$user_id)";

    if (mysqli_query($con, $sql)) {
        http_response_code(201);
        $category = [
            'id'                => mysqli_insert_id($con),
            'name'              => $name,
            'user_id'           => $user_id

       
        ];
        echo json_encode($category);
    } else {
        http_response_code(422);
    }
}
