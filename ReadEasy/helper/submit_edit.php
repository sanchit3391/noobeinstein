<?php
require('dbconnection.php');
$start_index = null;
$end_index = null;
$parent_id = null;
if(isset($_POST['original_start']))
  $start_index = $_POST['original_start'];
if(isset($_POST['original_end']))
  $end_index = $_POST['original_end'];
if(isset($_POST['parent_id']))
  $parent_id = $_POST['parent_id'];
$edited_by = $_POST['edited_by'];
$content = $_POST['content'];
$datetime = date('Y-m-d');
$document_id = $_POST['document_id'];
$conn = get_connection();
$sql = "insert into edits (edited_by, datetime_of_edit, original_start, original_end, content, vote, document_id) values ('{$edited_by}', '{$datetime_of_edit}' , '{$start_index}', '{$end_index}', '{$content}', 0, '{$document_id}') ";
if(mysqli_query($conn, $sql)){
echo "0";
}
else{
echo "-1";
}
mysqli_close($conn);
?>