<?php
require('dbconnection.php');
$vote_count = $_POST['vote_count'];
$id = $_POST['id'];
$conn = get_connection();
$sql = "update edits set vote='{$vote_count}' where id='{$id}'";
$results = mysqli_query($conn, $sql);
$sql = "select * from edits where id='{$id}'";
$results = mysqli_query($conn, $sql);
$return_json = array();
while($row = mysqli_fetch_array($results))
{
  $temp_arr = array(
  "id" => $row['id'],
  "vote" => $row['vote']
  );	   
  array_push($return_json, $temp_arr);
}
echo json_encode($return_json);
?>