<?php
    include('dbconnect.php');

    if(isset($_POST['adminID']))
    {
        $adminID = $_POST['adminID'];
    }
       
    if(isset($_POST['adminPW']))
    {
        $adminPW = $_POST['adminPW'];   
    }
       
    $admin = $conn->query("SELECT UserID FROM useraccounts WHERE UserID = '".
    $adminID ."' AND UserPassword = '" . $adminPW."';");
       
    $outp = "";
    $count = 0;
       
    while($rs = $admin->fetch_array(MYSQLI_ASSOC)){
        $count +=1;
        $outp = $rs["UserID"];
    }
       
    if($count ==0)
    {
        $outp = 'Invalid Admin ID or Password';       
    }

    $conn->close();
    echo($outp);
?>