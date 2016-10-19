<?php
    include('dbconnect.php');         
    
       
    $result  = $conn->query("SELECT * FROM RegistrationCodes WHERE AccountType = 'normal';");

    while($rs = $result->fetch_array(MYSQLI_ASSOC)) {		
		$outp[] = 
        [
            "CodeID" => $rs["CodeID"],
            "Code" => $rs["Code"],				
            "AccountType" => $rs["AccountType"]

        ];
		
	}  
       
    

    $conn->close();
    echo(json_encode($outp));
?>