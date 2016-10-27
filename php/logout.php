<?php
    include('dbconnect.php');
    
    $sql = "DELETE FROM session";
    
    if ($conn->query($sql) === TRUE) {
            echo "Log out sucessfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

$conn->close();

?>