<?php
    include('dbconnect.php');

    $sql = $conn->query("SELECT * FROM session;");

     while($rs = $sql->fetch_array(MYSQLI_ASSOC)){
        $outp[] = [
            "UserID" => $rs["UserID"],
            "AccountType" => $rs["AccountType"]
        ];
    }

    $conn -> close();
    echo(json_encode($outp));
?>