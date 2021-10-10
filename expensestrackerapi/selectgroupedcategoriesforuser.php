<?php
require 'connection.php';

$user_token = ($_GET['user_token'] !== "") ? mysqli_real_escape_string($con, $_GET['user_token']) : false;
if (!$user_token) {
    return http_response_code(400);
}

$user_has_grouped_categories = [];
$sql = "SELECT
        SUM(amount) AS total_expenses,
        c.name AS category_name
        FROM
        expenses e
        JOIN categories c ON
        e.category_id = c.id
        JOIN users u ON
        u.id = e.user_id
        WHERE
        u.id =  $user_token 
        GROUP BY
        category_name";

if ($result = mysqli_query($con, $sql)) {
    $i = 0;
    while ($row = mysqli_fetch_assoc($result)) {
        $user_has_grouped_categories[$i]['category_name']               = $row['category_name'];
        $user_has_grouped_categories[$i]['total_expenses']               = $row['total_expenses'];
        $i++;
    }

    echo json_encode($user_has_grouped_categories);
} else {
    http_response_code(404);
}
