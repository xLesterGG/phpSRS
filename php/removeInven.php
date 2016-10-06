<?php 
    include('dbconnect.php');
    $sql = '';
    
    //translate & delete
    parse_str(file_get_contents("php://input"),$del_vars);
    if($del_vars['iID'] !=='')
    {
        $iID = $del_vars['iID'];
        $sql = "DELETE FROM inven WHERE itemName = '" . $iID . "';";
    }
    
    //feedback
    if ($conn->query($sql)==TRUE){
        echo "Inventory successfully removed";
    } else {
        echo "Error: " .$sql. "<br>" . $conn-error . "Please contact system administrator";
    }
    
    $conn->close();
?>