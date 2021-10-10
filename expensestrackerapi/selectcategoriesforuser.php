<?php
require 'connection.php';

$user_token = ($_GET['user_token'] !== "") ? mysqli_real_escape_string($con, $_GET['user_token']) : false;
if (!$user_token) {
    return http_response_code(400);
}

$user_has_categories = [];
// $sql = "SELECT *,p.id,p.name,c.name AS category_name from products p JOIN users_has_products uhp ON p.id = uhp.product_id JOIN categories c ON p.category_id =c.id  JOIN users u ON u.id = '" . $user_token . "'";
$sql = "SELECT * FROM categories WHERE user_id  = '" . $user_token . "'";


if ($result = mysqli_query($con, $sql)) {
    $i = 0;
    while ($row = mysqli_fetch_assoc($result)) {
        $user_has_categories[$i]['id']                 = $row['id'];
        $user_has_categories[$i]['name']               = $row['name'];
      


        $i++;
    }

    echo json_encode($user_has_categories);
} else {
    http_response_code(404);
}
