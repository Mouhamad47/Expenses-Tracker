<?php
require 'connection.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    // Extract the data.
    $request = json_decode($postdata);


    // Validate.
    if ($request->amount == '' || $request->category_id == null || $request->user_id == null) {
        return http_response_code(400);
    }

    // Sanitize.
    $amount              = mysqli_real_escape_string($con, trim($request->amount));
    $category_id        = mysqli_real_escape_string($con, trim($request->category_id));
    $date_of_creation   = date("Y-m-d");
    $user_id        = mysqli_real_escape_string($con, trim($request->user_id));

    // Create.
    $sql = "INSERT INTO expenses VALUES (null, '$amount', '$date_of_creation','$category_id','$user_id')";

    if (mysqli_query($con, $sql)) {
        http_response_code(201);
        $expenses = [
            'id'                => mysqli_insert_id($con),
            'amount'            => $amount,
            'date_of_creation'  => $date_of_creation,
            'category_id'       => $category_id,
            'user_id'           => $user_id








        ];
        echo json_encode($expenses);
    } else {
        http_response_code(422);
    }
}
