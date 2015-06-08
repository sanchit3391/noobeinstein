<?php
require('dbconnection.php');
$username = $_POST['username'];
$password = $_POST['password'];

$conn = get_connection();

$sql = "select * from user where username='{$username}' and password = '{$password}'";
$result = mysqli_query($conn, $sql);
if($result){
  $num_rows = mysqli_num_rows($result);
  if($num_rows==1)
  {
    header("Location:../category_selection.php");
    exit();
  }
  else
  {
    echo "failure";
  }
}
else{
  echo "Failure!";
}
mysqli_close($conn);
?>