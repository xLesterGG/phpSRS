<?php 
    include('dbconnect.php');

    if(isset($_POST['UserID']) || isset($_POST['UserPassword']) || isset($_POST['AccountType']) )
    {
        $UserID = $_POST['UserID'];
        $UserPassword = $_POST['UserPassword'];
        $AccountType = $_POST['AccountType'];
        
        $sql = "INSERT INTO useraccounts(UserID, UserPassword, AccountType) VALUES ('" .$UserID ."','" .$UserPassword ."','" .$AccountType ."');";
        
        if ($conn->query($sql) === TRUE){
            echo "Successfully registered";
        } else {
            echo "Error: " .$sql. "<br>" . $conn->error;
        }
        
    }
    $conn->close();


?>