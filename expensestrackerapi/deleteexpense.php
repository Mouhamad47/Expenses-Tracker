<?php

require 'connection.php';

$expense_id = ($_GET['expense_id'] !== null && $_GET['expense_id'] > 0) ? mysqli_real_escape_string($con, $_GET['expense_id']) : false;

if (!$expense_id) {
    return http_response_code(400);
}

// Delete.
$sql = "DELETE FROM expenses WHERE id =" . $expense_id;

if (mysqli_query($con, $sql)) {
    http_response_code(204);
    
} 
else {
    return http_response_code(422);
}
