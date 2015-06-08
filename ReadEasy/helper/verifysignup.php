<?php
require('dbconnection.php');
$username = $_POST['username'];
$password = $_POST['password'];
$name = $_POST['name'];
$image = $_POST['image'];

$conn = get_connection();

$sql = "insert into user (username, password, name, image) values ('{$username}', '{$password}', '{$name}', '{$image}');";

if(mysqli_query($conn, $sql)){
echo "Success!";
}
else{
echo "Failure!";
}
mysqli_close($conn);
?>