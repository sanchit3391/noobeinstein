<?php
require('dbconnection.php');
$document_id = $_POST['document_id'];
$conn = get_connection();
$sql = "select * from document where id='{$document_id}'";
$results = mysqli_query($conn, $sql);
$return_json = array();
while($row = mysqli_fetch_array($results))
{
$temp_arr = array(
"id" => $row['id'],
"content" => $row['content'],
"title" => $row['title'],
"category_id" => $row['category_id'],
);
 array_push($return_json, $temp_arr);
}
echo json_encode($return_json);
?>