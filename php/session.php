<?php
    include('dbconnect.php');
    
    if(isset($_POST['userID']))
    {
        $adminID = $_POST['userID'];
    }

    if(isset($_POST['Acc']))
    {
        $Acc = $_POST['Acc'];
    }

    $sql = ("INSERT INTO session(UserID,AccountType) VALUES ('" .$adminID. "','" .$Acc. "');");                        

                            
    if ($conn-> query($sql) === TRUE){
        echo "Start Session";
    } else {
        echo "Error: " .$sql. "<br>" . $conn->error;
    }
                                
    $conn->close();
?>