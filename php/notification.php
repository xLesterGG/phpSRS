<?php
    include('dbconnect.php');
    $result = $conn->query("SELECT * FROM inventory;");
    $outp = "";

    while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
		if ($rs['UnitsAvailable']<= 5) {
            if ($outp != "") {
            $outp .= ",";
            }
         
		    $outp .= '{"itemName":"'  . $rs["ItemName"] . '"}'; 
        }   
	}
    $outp ='['.$outp.']';
	$conn->close();
    echo($outp);
    
?>