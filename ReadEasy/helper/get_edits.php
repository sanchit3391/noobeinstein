<?php
require('dbconnection.php');
$start_index = $_POST['start_index'];
$end_index = $_POST['end_index'];
$document_id = $_POST['document_id'];
$where_clause = "where document_id='{$document_id}'";
if($start_index != -1)
 $where_clause = $where_clause . " and original_start='{$start_index}' and original_end = '{$end_index}' and parent_id is null";
$where_clause .= " order by vote desc";
$conn = get_connection();
$sql = "select * from edits " . $where_clause;
$results = mysqli_query($conn, $sql);
$return_json = array();
while($row = mysqli_fetch_array($results))
{
$temp_arr = array(
"id" => $row['id'],
"edited_by" => $row['edited_by'],
"content" => $row['content'],
"original_start" => $row['original_start'],
"original_end" => $row['original_end'],
"vote" => $row['vote'],
"datetime" => $row['datetime_of_edit']
);
 array_push($return_json, $temp_arr);
}
echo json_encode($return_json);
?>