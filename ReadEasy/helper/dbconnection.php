<?php
function get_connection(){
  $servername = "localhost";
  $username = "readeasyadmin";
  $password = "1234";
  $dbname = "read_easy";
  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);
  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  } 
  return $conn;
}
?>