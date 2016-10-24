<?php
    include('dbconnect.php');

    if(isset($_POST['adminID']))
    {
        $adminID = $_POST['adminID'];
    }
       
       
    $admin = $conn->query("SELECT * FROM useraccounts WHERE UserID = '". $adminID ."';");
    #$admin = $conn->query("SELECT * FROM useraccounts WHERE UserID = 'Ambrose' ;");
       
       
    while($rs = $admin->fetch_array(MYSQLI_ASSOC)){
        $outp[] = [
            "UserID" => $rs["UserID"],
            "AccountType" => $rs["AccountType"]
        ];
    }

    $conn -> close();
    echo(json_encode($outp));
?>